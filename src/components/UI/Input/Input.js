// useImperativeHandle hook allows us to use the functionalities from inside a component imperatively not through regular state props management, not by controlling the component with a state in a parent component, but instead by directly calling and manipulating something in the component programmatically

import React, { useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

// Wrapping my component in order to be exported properly for ref to activate
// that is forwardRef() that returns a react component that is capable of being bound to a ref
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // My goal is not to this after the input is rendered (useEffect below) but to have my own method in the input component (called it "activate" in this case)
  // This is a function called from outside the component not inside
  //  a rare use case that should be avoided but provides an elegant solution here
  const activate = () => {
    inputRef.current.focus();
  };

  // calling useImperativeHandle and passing in 2 things
  // second is a function that should return an object containing all data I'll be able to use from outside
  // here adding focus field and pointing to internal function/var that should be accessible from outside through that name
  // for this page, pointing to activate

  // The first argument is something we get in the component function argument list
  // in 99% of cases props is all we need in React but there is another argument called ref that is only if a red was set from outside
  // the ref here will be part of allowing the binding of ref s because it was set in the parent component
  // Only what I expose here through the useImperative Handler, I will be able to use
  // here I am exposing the focus function (fun because it points at the activate function)
  useImperativeHandle(ref, () => {
    return {
      // function and external available name
      focus: activate,
    };
  });

  // empty dependency array so it runs only the first time the component is rendered
  // useEffect(() => {
  //   // focus is a method, not coming from react but from JS, specifically here from the input DOM object I'm dealing with
  //   inputRef.current.focus();
  // }, []);

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        // ref prop is supported on all built in html components
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
