import React from "react";

// Calling create context on react that takes a default context (the context is really the app wide or component wide state)
// it can be a text string, but often its an object as below
// the AuthContext itself is not a component, but an object that will contain a component later on
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});

export default AuthContext;
