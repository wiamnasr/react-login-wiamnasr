import React, { useState, useEffect } from "react";

// Calling create context on react that takes a default context (the context is really the app wide or component wide state)
// it can be a text string, but often its an object as below
// the AuthContext itself is not a component, but an object that will contain a component later on
const AuthContext = React.createContext({
  isLoggedIn: false,
  // Just a dummy function for better IDE completion, will not be used anyways
  // this will inform the IDE to expect the onLogout
  onLogout: () => {},
  onLogin: (email, password) => {},
});

// Managing all the authentication state in this separate provider component
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Executed after every component re-evaluation but only if the dependencies changed [], he no dependencies (runs once, when app starts)
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    // This creates an infinite loop by itself, that's why we need useEffect
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
