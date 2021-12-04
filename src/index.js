import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

// Now the central place for the off state management is not the app component but a dedicated context file
// More focused, leaner app component that is not concerned with App wide state management
// But bringing something to the screen!
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
