import React, { useState } from "react";

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



const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
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
