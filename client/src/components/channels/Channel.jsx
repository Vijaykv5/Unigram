import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LeftSidebar from "../LeftSidebar";
import Navbar from "../Navbar";
import { FiSend } from "react-icons/fi";
import { Base_URL } from "../../utils/constants";
const Channel = () => {
  const { channel } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
  
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${Base_URL}/channel/${channel}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [channel]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user details from localStorage
      const userDetails = JSON.parse(localStorage.getItem("user_details"));

      // Check if user details exist
      if (!userDetails) {
        throw new Error("User details not found");
      }

      const { user_id, name, image } = userDetails;

      // Prepare message data
      const messageData = {
        user_id,
        name,
        channel,
        image,
        message,
      };

      // Call your API
      const response = await fetch(`${Base_URL}/channel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      console.log("Message sent successfully");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    return timeString;
  };

  return (
    <div>
      <Navbar />
      <div className="flex m-5">
        <div className="w-72 m-3 h-screen">
          <LeftSidebar />
        </div>
        <div className="flex-1 ">
            <h1 className="text-2xl font-semibold text-black">Channel: {channel}</h1>
          <div className="bg-slate-200 rounded-md w-[100%] h-[100%] overflow-y-auto p-4">
            {/* Display messages */}
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start mb-4">
                <Link to={`/profile/${msg.user_id}`}>
                  <img
                    src={msg.image}
                    alt={msg.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                </Link>
                <div>
                  <p className="text-black">{msg.name}</p>
                  <div className="bg-gray-800 rounded-lg p-2">
                    <p className="text-white">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatTimestamp(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 ml-[20%] p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
          className="border border-gray-300 rounded-md p-2 mr-2 flex-1"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#7BB7E3] hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          <FiSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Channel;
