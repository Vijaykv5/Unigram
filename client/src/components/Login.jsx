import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const isLoggedIn = async (e) => {
    console.log(email, password);
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigateTo("/home/" + data.userDetails.user_id);
        localStorage.setItem("user", JSON.stringify(data.userDetails));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-theme">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4 md:px-10">
        <div className="w-full max-w-[400px] space-y-4 bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold title text-primary">Login</h1>
            <p className="text-black welcome-message">
              Welcome back! Enter your information to login
            </p>
          </div>
          <form onSubmit={isLoggedIn}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-primary"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-primary bg-background px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring focus:border-primary"
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none text-primary"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-primary bg-background px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring focus:border-primary"
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="bg-blue-400 text-white rounded-md text-sm font-medium py-2 px-4 transition duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                type="submit"
              >
                Log In
              </button>
              <div className="mt-4 text-center text-sm " >
                New to Unigram?
                <a className="text-primary underline" href="/signup">
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
