import React from 'react';
// Firebase deps
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register';
import Reset from './pages/Reset';
import Activities from './pages/Activities'


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/activities" element={<Activities />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
);
}

export default App;