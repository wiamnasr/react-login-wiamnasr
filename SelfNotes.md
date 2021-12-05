#### Self Notes taken on new concepts (for me) in REACT, from:

# REACT - The Complete Guide (incl Hooks, React Router, Redux)

# Udemy

## Section 10: Advanced: Handling Side Effects, Using Reducers and Using the Context API

> ### 116. Introducing useReducer & Reducers In General

useReducer is another built-in hook to help with state management, but with more capabilities and used to manage more complex states

> An alternative to useState if you need a more powerful events manager, its more complex to get it to work than useState

useReducer is used instead of useState when:

## 1. There are states that belong together

## &/or

## 2. If there are state updates that depend on other state

# > const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);

> - "state": The state snapshot used in the component re-render/re-evaluation cycle

> - "dispatchFn": A function that can be used to dispatch a new action (i.e. trigger an update of the state)

> - "reducerFn": (prevState, action) => newState

                => a function that is triggered automatically once an action is dispatched (via disatchedFn()) - it receives the latest state snapshot and should return the new, updated state

> Additionally, "initialState" and "initialFn" that should run to set that initial state, in case the initial state is bit more complex (i.e. the result of an HTTP request) => will ignore these for now

<br />

## useReducer() vs useState() when to use which?

when using useState becomes cumbersome, or you are getting a lot of bugs/ unintended behaviors

When dealing with related state snapshots

useState is the main state management tool, great for independent states of data that are easy and limited to a few kinds of updates

useReducer is great if you need more power, especially helpful in a scenario of complex state updates

<br />

<br />

<h1> REACT Context Limitations </h1>

#### REMEMBER!

## Use props for configuration, Context for state management across components or across other apps

## React Context is NOT optimized for high frequency changes

## Later on Redux will solve a lot of current limitation, for now use context to replace long prop chains

<br />

<br />

# Rules of Hooks

> 2 main rules for hooks (useEffect, useReducer, ...)

## 1. Only Call react hooks in React functions (component functions and custom hooks - will dive into that later)

## 2. Only call React hooks at the top level of your React component functions or custom hooks functions

> ### 3. Third Rule, Not directly related to all hooks, but to the useEffect hook: Make sure you add everything you refer to inside useEffect as a dependency, unless there is a good reason not to do that (allowed to omit dependencies that do not change)
