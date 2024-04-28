import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    try {
      const response = await fetch("http://localhost:3002/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast.success("Logged in successfully");
        setTimeout(() => {
          
          setLoading(false);
          
          navigateTo("/admin/dashboard");
        }, 3000);
      } else {
        
        // Authentication failed
        setLoading(false); // Hide loader
        console.error("Login failed");
        toast.error("Invalid username or password");
      }
    } catch (error) {
      setLoading(false); // Hide loader
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div className="flex justify-center  items-center h-screen bg-[#7BB7E3]">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg  ">
        <h2 className="text-2xl text-center font-Platypi mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging in..." : "Login"}{" "}
            {/* Show different text based on loading state */}
          </button>
        </form>
      </div>
      <Toaster position="top-right" timeout={3000} reverseOrder={false} />
    </div>
  );
};

export default AdminLogin;
