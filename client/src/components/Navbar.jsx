import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user_details"));
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

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
              to="/home/:id"
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
          <div className="relative inline-block ">
            <button
              onClick={toggleDropdown}
              className="text-xl text-black  flex items-center"
            >
              <img
                className="w-12 h-12 me-2 rounded-full"
                src={user.image || "https://randomuser.me/api/portraits"}
                alt="user photo"
              />
              {user.name}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <Link
                    to={`/profile/${user.user_id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => {
                      localStorage.clear(), sessionStorage.clear();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex gap-5">
              <Link to="/signup" className="text-xl ">
                <div className="py-2 px-4 bg-theme rounded-md text-white">
                  Sign Up
                </div>
              </Link>
              <Link to="/login" className="text-xl text-black">
                <div className="py-2 px-4 border border-slate-950 rounded-md ">
                  Sign In
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
