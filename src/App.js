import React from 'react';
// Firebase deps
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register';
import Reset from './pages/Reset';
import Profile from './pages/Profile';
import Activity from './pages/Activity';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path={`/activity/:activityID`} element={<Activity />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
);
}

export default App;