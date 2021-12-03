import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Without the dependency array, the useEffect function will run every time this component function reruns (after it)
  // If we add an empty array as a dependency, the useEffect will run only once, when the component is first mounted
  // Alternatively if we add a dependency/ies in the dependency array such as the enteredPassword, this will cause useEffect function to run whenever the state of enteredPassword changes (and other defined dependencies, here only one)
  useEffect(() => {
    console.log("Effect Running");

    // clean-up function that runs before the state function as a whole runs, but not before the first time it runs
    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, [enteredPassword]);

  // This useEffect will run only if either setFormIsValid, or enteredEmail or enteredPassword changed in the last component re-render cycle
  // Ommitting setFormIsValid (state updating function) from the dependencies array as its guaranteed not to change unlike enteredEmail and enteredPassword
  // Note, we need to debounce the user input (we dont want to do something with every keystroke, but wait until user stopped typing to trigger)
  // with useEffect this can be achieved easily with setTimeout
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");

      // Setting a timer for every keystroke (500 ms) after which setFormIsValid is run
      // The trick is to save the item and with the next keystroke, we clear it (1 ongoing timer at a time, only the last one will complete)
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    // I can return something in the useEffect, here returning an anonymous arrow function (cleanup function before useEffect executes the function for the next time)
    // This will run every time except for the first side-effect function execution
    return () => {
      // Using the identifier to clear the previous timer with the built-in clearTimeout function
      clearTimeout(identifier);
      console.log("CLEANUP");
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
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
