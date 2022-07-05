import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    navigate("/chat");
  };

  return (
    <div >
      <div >
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={register}>
          Register
        </button>
        <button
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;