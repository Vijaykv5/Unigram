import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Signup = () => {
  
  const [formData, setFormData] = useState({
    user_id: uuidv4(),
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigateTo = useNavigate();
  const { user_id,name, email, password } = formData;

  


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    try {
      const response = await fetch("http://localhost:3002/signup", {
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
    <div className="bg-theme">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-4 md:px-10">
        <div className="w-full max-w-[400px] space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-black ">
              Enter your information to create an account
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="name"
                  placeholder="Vijay KV"
                  type="name"
                  required=""
                  value={name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <button
                className="inline-flex items-center   bg-black text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                type="submit"
              >
                Sign Up
              </button>
              <div className="mt-4 text-center text-sm">
                Already have an account?
                <a className="underline" href="/login">
                  Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
