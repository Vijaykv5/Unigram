import React from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className="flex">
    
      <div className="w-1/2 p-7 flex flex-col justify-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <div className="p-7">
          <h1 className="text-7xl font-bold ">
            <span className="border-b-4 border-theme">Let's</span>
          </h1>
          <h1 className="text-7xl font-bold text-theme mt-4">Collaborate</h1>
          <h1 className="text-7xl font-bold  mt-4">together!</h1>
        </div>

        <p className="text-lg p-7 text-gray-700">
          A closed platform for college students to engage in tech-related
          discussions, peer learning, and mentorship opportunities.
        </p>
        <div className="ml-8">
          <Link
            to="/signup"
            className="text-xl bg-theme hover:bg-blue-300 rounded-md text-white py-2 px-8 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Explore
          </Link>
        </div>
      </div>

     
      <div className="w-1/2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <img
          src="https://i.ibb.co/qgxr4PD/3406394-1.png"
          alt="landing"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
};

export default Landing;
