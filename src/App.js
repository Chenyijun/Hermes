import React from 'react';
// Firebase deps
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from './hooks';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register';
import Reset from './pages/Reset';
import Activities from './pages/Activities'


const firebaseConfig = {
  apiKey: "AIzaSyCR67Wmr9XabnSzTF15zJVP1_QuGDrw7RM",
  authDomain: "hermes-95b99.firebaseapp.com",
  projectId: "hermes-95b99",
  storageBucket: "hermes-95b99.appspot.com",
  messagingSenderId: "83805063915",
  appId: "1:83805063915:web:4f612472083ea2cc150cae",
  measurementId: "G-6JWQ963TD7"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()


function App() {
  const { user, initializing } = useAuthState(firebase.auth());

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await db.addDoc(db.collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await auth.sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/activities" element={<Activities />} />

      </Routes>
    </Router>
  );
}

export default App;
