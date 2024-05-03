import React, { useState } from "react";
import Trending from "./trending/Trending";
import { useNavigate } from "react-router-dom";
const RightSidebar = () => {
  const navigateTo=useNavigate()
  const channels = ["#100DaysOfCode", "#git", "#python", "#Amazon"];
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  const sendChannelToBackend = (channel) => {
    // Send the selected channel to the backend
    fetch("http://localhost:3002/selected-channel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel: channel }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        navigateTo(`/${channel.replace("#", "")}`);
        // If you need to handle the response from the backend, do it here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    sendChannelToBackend(channel);

    // Redirect the user to the selected channel URL
    // window.location.href = `/${channel.replace("#", "")}`;
  };

  return (
    <div className="fixed">
      <div className="bg-[#7BB7E3] w-56 text-white text-xl flex justify-center">
        <div className="p-2 font-Platypi font-semibold items-center">
          Trending Topics
        </div>
      </div>
      <div className="mt-2">
        <div>
          <Trending channels={channels} onChannelSelect={handleChannelSelect} />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
