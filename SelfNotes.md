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
