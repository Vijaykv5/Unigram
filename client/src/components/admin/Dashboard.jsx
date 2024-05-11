import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: description }), // Corrected here
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        toast.success("Post successful");
        setDescription(""); // Clear textarea after successful post
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage || response.statusText);
        toast.error("Failed to post");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id="description"
          placeholder="What do you want to talk about?"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none mb-2"
          rows="3"
          value={description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Post
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
