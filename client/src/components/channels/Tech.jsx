import React, { useEffect, useState } from "react";


const Tech = () => {
  // Array of channel names
  // const channels = ["Technology", "Resources", "Frontend", "Backend", "DSA", "Competitive Programming","Mini Projects","Open Source"];

  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState([]);

  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  //fuction to call channels

  useEffect(() => {{
    getChannels();
  }},[])

const getChannels = async () => {
  try {
    const response = await fetch("http://localhost:3002/admin/channel");
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




  // Function to handle channel selection
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className=" bg-black mx-auto ">
      <div className="h-screen text-white  font-semibold pt-1 p-12">
        {channels.map((channel, index) => (
          <div
            key={index}
            className={`py-2 px-4  m-4 cursor-pointer hover:bg-gray-700 ${
              channel === selectedChannel ? "bg-gray-700" : ""
            }`}
            onClick={() => handleChannelSelect(channel)}
          >
            {channel}
          </div>
        ))}
      </div>
      <div>{newChannel}</div>
    </div>
  );
};

export default Tech;
