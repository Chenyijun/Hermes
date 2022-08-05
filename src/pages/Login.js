import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginWrapper, Header1, LoginFormWrapper, WhiteText, WhiteLink, LoginBottomWrapper } from "../components/mainComponents";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <LoginWrapper>
      <Header1>Spark</Header1>
      <LoginFormWrapper>
        <WhiteText>Email</WhiteText>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <WhiteText>Password</WhiteText>
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br/>
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <br/>
      </LoginFormWrapper>
      <LoginBottomWrapper>
          <WhiteLink to="/reset">Forgot Password</WhiteLink>
          <br/>
          Don't have an account? <WhiteLink to="/register">Register</WhiteLink> now.
        </LoginBottomWrapper>
    </LoginWrapper>
  );
}
export default Login;