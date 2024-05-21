// Frontend: MessagesContent.jsx

import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, Toaster } from "react-hot-toast";
import { Base_URL } from "../../../utils/constants";



const MessagesContent = () => {
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState("");

  useEffect(() => {{
    getChannels();
  }},[])


  const getChannels = async () => {
    try {
      const response = await fetch(`${Base_URL}/admin/channel`);
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const channels = data.map((channel) => channel.Channels);
          setChannels(channels);
          console.log("Channels:", channels);
        } else {
          console.error("Invalid data format:", data);
        }
      } else {
        console.error("Failed to fetch channels");
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const handleNewChannelChange = (e) => {
    setNewChannel(e.target.value);
  };

  const handleAddChannel = async () => {
    if (newChannel.trim() && !channels.includes(newChannel.trim())) {
      try {
        const response = await fetch(`${Base_URL}/admin/channel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ channelName: newChannel.trim() }),
        });
        if (response.ok) {
          const data = await response.json();
          setChannels([...channels, data.newChannel.channelName]);
          setNewChannel("");
          toast.success("Channel added Successfully");
          console.log("Channel added successfully", newChannel);
        } else {
          console.error("Failed to add channel");
           toast.error("Invalid ");
        }
      } catch (error) {
        console.error("Error adding channel:", error);
      }
    }
  };


  const handleDeleteChannel = async (channel) => {
    try {
      const response = await fetch(`${Base_URL}/admin/channel`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelName: channel }),
      });

      if (response.ok) {
        const updatedChannels = channels.filter((c) => c !== channel);
        setChannels(updatedChannels);
        toast.success("Channel deleted Successfully");
        console.log("Channel deleted successfully", channel);
      } else {
        console.error("Failed to delete channel");
        toast.error("Failed to delete channel");
      }
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Channels</h2>
      </div>
      <div className="mt-20">
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
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Channels</h2>
        <div className="grid grid-cols-3 gap-4">
          {channels.map((channel, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded flex justify-between items-center"
            >
              <span className="text-white">{channel}</span>
              <button
                onClick={() => handleDeleteChannel(channel)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" timeout={3000} reverseOrder={false} />
    </div>
  );
};

export default MessagesContent;
