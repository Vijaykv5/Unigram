import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sample2 from "./components/Sample2";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/profile/Profile";
import Model from "./components/Model";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/Dashboard";
import Landing from "./Landing";
import TrendingPage from "./components/TrendingPage";
import Internships from "./components/mainchannels/Internships.js";
import Channel from "./components/channels/Channel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Model />} />
        <Route path="/Home/:userId" element={<Home />} />
        <Route path="/usersList" element={<Sample2 />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/:channel" element={<TrendingPage />} />
       <Route path="/channel/:channel" element={<Channel />}/> 
      

        {/* <Route path="/rankings"  element={<Rankings/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
