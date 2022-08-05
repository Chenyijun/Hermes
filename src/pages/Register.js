import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginWrapper, Header1, LoginFormWrapper, WhiteText, WhiteLink, LoginBottomWrapper } from "../components/mainComponents";

import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();


  const register = () => {
    console.log(email)
    if (!firstName) alert("Please enter first name");
    registerWithEmailAndPassword(firstName, lastName, email, password);
    navigate("/home");
  };

  return (
    <LoginWrapper>
      <Header1>Register for Spark</Header1>
      <WhiteText>Feel free to use a fake email, it won't send any email confirmation. <br/> But please use your first name so others can know who you are :)</WhiteText>
      <LoginFormWrapper>
        <WhiteText>First Name</WhiteText>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <WhiteText>Last Name</WhiteText>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <WhiteText>Email</WhiteText>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <WhiteText>Password</WhiteText>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br/>
        <button onClick={register}>
          Register
        </button>
      </LoginFormWrapper>
      <LoginBottomWrapper>
        Already have an account? <WhiteLink to="/">Login</WhiteLink> now.
      </LoginBottomWrapper>
    </LoginWrapper>
  );
}
export default Register;