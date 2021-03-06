import React, { useContext } from "react";

// Components
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

// Context
// import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);

  //
  // Moved to auth-context as a separate provider component
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Executed after every component re-evaluation but only if the dependencies changed [], he no dependencies (runs once, when app starts)
  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  //   // This creates an infinite loop by itself, that's why we need useEffect
  //   if (storedUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyway

  //   // Storing data in localstorage
  //   localStorage.setItem("isLoggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  return (
    <React.Fragment>
      {/* Now after wrapping my components with the AuthContext, they will all have access to it as well as their children and their children's children */}
      {/* <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
        }} */}
      >
      <MainHeader />
      <main>
        {/* I will still pass loginHandler and logoutHandler directly in the main section as I directly use these handlers in the login and home components */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
