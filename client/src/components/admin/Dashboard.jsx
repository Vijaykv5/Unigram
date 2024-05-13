import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [newChannel, setNewChannel] = useState("");
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Fetch total number of users
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/profile/:userId");
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

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
        body: JSON.stringify({ content: description }),
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

  const handleNewChannelChange = (e) => {
    setNewChannel(e.target.value);
  };

  const handleAddChannel = () => {
    if (newChannel.trim() && !channels.includes(newChannel.trim())) {
      setChannels([...channels, newChannel.trim()]);
      setNewChannel("");
    }
  };

  return (
    <div>
      <div>
        <p>Total users: {totalUsers}</p>
      </div>
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

      <div className="mt-4">
        <input
          type="text"
          placeholder="Add new channel"
          className="border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          value={newChannel}
          onChange={handleNewChannelChange}
        />
        <button
          onClick={handleAddChannel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Channel
        </button>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
