import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sample2 from "./components/Sample2";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/usersList" element={<Sample2/>} />
      </Routes>
    </Router>
  );
}

export default App;
