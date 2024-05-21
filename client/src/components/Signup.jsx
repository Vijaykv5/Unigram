import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Signup.css";
import { Base_URL } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    user_id: uuidv4(),
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const { user_id, name, email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      const response = await fetch(`${Base_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("response", response);
      if (response?.ok) {
        localStorage.setItem("user", JSON.stringify(formData));
        console.log("Data sent successfully");
        navigateTo("/home");
      } else {
        console.error("Failed to send Details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEmailBlur = (e) => {
    const { value } = e.target;
    // Check if the entered email ends with the specified domain
    if (!value.endsWith("@rajagiri.edu.in")) {
      setErrorMessage(
        "Please enter a valid email address ending with @rajagiri.edu.in"
      );
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="space-y-2 text-center">
          <h1 className="signup-title">Sign Up</h1>
          <p className="text-black signup-description">
            Enter your information to create an account
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                placeholder="Vijay KV"
                type="text"
                required=""
                value={name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                placeholder="m@example.com"
                type="email"
                required=""
                value={email}
                onBlur={handleEmailBlur}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                required=""
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button className="signup-button" type="submit">
              Sign Up
            </button>
            <div className="mt-4 text-center text-sm signup-login-link">
              Already have an account?
              <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
