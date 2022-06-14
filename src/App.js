import React from 'react';
// Firebase deps
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import ChatHome from './pages/ChatHome'
import Register from './pages/Register';
import Reset from './pages/Reset';
import Activities from './pages/Activities';
import Profile from './pages/Profile';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/chat" element={<ChatHome />} />
        <Route exact path="/activities" element={<Activities />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
);
}

export default App;