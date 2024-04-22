import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="text-white py-14 px-14 flex justify-between items-center">
      <div>
        <span className="text-5xl font-bold text-black">UNI</span>
        <span className="text-5xl font-bold text-[#7BB7E3]">GRAM</span>
      </div>
      <div className="flex space-x-32 text-black">
        {user && (
          <>
            <Link
              to="/home"
              className="text-xl font-semibold relative after:-translate-y-1 after:absolute after:bottom-0 after:w-full after:h-1 after:bg-blue-500 after:content-'' after:opacity-0 after:transition-all after:duration-300"
            >
              Community
            </Link>
            <Link
              to="/rankings"
              className="text-xl font-semibold relative after:-translate-y-1 after:absolute after:bottom-0 after:w-full after:h-1 after:bg-blue-500 after:content-'' after:opacity-0 after:transition-all after:duration-300"
            >
              Rankings
            </Link>
            <Link
              to="/Internships"
              className="text-xl font-semibold relative after:-translate-y-1 after:absolute after:bottom-0 after:w-full after:h-1 after:bg-blue-500 after:content-'' after:opacity-0 after:transition-all after:duration-300"
            >
              Internships
            </Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <Link to={`/profile/${user.user_id}`} className="text-xl text-black">
            {user.name}
          </Link>
        ) : (
          <>
            <Link to="/signup" className="text-xl text-black mr-4">
              Sign Up
            </Link>
            <Link to="/login" className="text-xl text-black">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
