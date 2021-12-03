import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// Creating the reducer function outside the component function, I do not need any data that is generated in the component
// Receives 2 parameters, the last state snapshot and the action that was dispatched
// Here what I dispatch as an action will be an object as I defined it below
// I can check the action.type and see if its equal to USER_INPUT, in such case, I dont't want to return an empty state snapshot
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    // updating both the value and isValid whenever I receive the user input action
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    // using latest state snapshot
    return { value: state.value, isValid: state.value.includes("@") };
  }

  // returning a new object (default state) for any other action that reaches the reducer
  return { value: "", isValid: false };
};

// Password Reducer
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    // updating both the value and isValid whenever I receive the user input action
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    // using latest state snapshot
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  // returning a new object (default state) for any other action that reaches the reducer
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer Hook to combine input and validation in one
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Without the dependency array, the useEffect function will run every time this component function reruns (after it)
  // If we add an empty array as a dependency, the useEffect will run only once, when the component is first mounted
  // Alternatively if we add a dependency/ies in the dependency array such as the enteredPassword, this will cause useEffect function to run whenever the state of enteredPassword changes (and other defined dependencies, here only one)
  useEffect(() => {
    console.log("Effect Running");

    // clean-up function that runs before the state function as a whole runs, but not before the first time it runs
    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // Object Destructuring, pulling our isValid property and storing it in emailIsValid const => this is then passed as dependency to avoid un-necessary useEffect executions
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // This useEffect will run only if either setFormIsValid, or enteredEmail or enteredPassword changed in the last component re-render cycle
  // Ommitting setFormIsValid (state updating function) from the dependencies array as its guaranteed not to change unlike enteredEmail and enteredPassword
  // Note, we need to debounce the user input (we dont want to do something with every keystroke, but wait until user stopped typing to trigger)
  // with useEffect this can be achieved easily with setTimeout
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");

      // Setting a timer for every keystroke (500 ms) after which setFormIsValid is run
      // The trick is to save the item and with the next keystroke, we clear it (1 ongoing timer at a time, only the last one will complete)
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // I can return something in the useEffect, here returning an anonymous arrow function (cleanup function before useEffect executes the function for the next time)
    // This will run every time except for the first side-effect function execution
    return () => {
      console.log("CLEANUP");
      // Using the identifier to clear the previous timer with the built-in clearTimeout function
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // here since I want to save what the user entered, it would make sense to add some payload (here added the val field that holds the event.target.value)
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    // no need to add a val (value) for this one but this will not matter as the line where we try to access the value will not run for action of type "INPUT_BLUR"
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
