import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sample2 from "./components/Sample2";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import Model from "./components/Model";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/Dashboard";
// import Rankings from "./components/MainChannels/rankings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Model />} />
        <Route path="/Home/:userId" element={<Home />} />
        <Route path="/usersList" element={<Sample2 />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />

        {/* <Route path="/rankings"  element={<Rankings/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
