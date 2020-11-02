import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    //  auth to be set up from our firebase... & provider would also be Google... firebase..
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        dispatch({
          // dispatch the object...
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        {/* <img
        src = ""
       alt="devs2chat"
        /> */}
        <div className="login__text">
          <h1>Sign in to devs2chat</h1>
        </div>
        <Button onClick={signIn}>Login with Google</Button>
      </div>
    </div>
  );
}

export default Login;
