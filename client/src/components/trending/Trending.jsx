import React, { useState } from "react";

const Trending = () => {
 
  const channels = [
    "#100DaysOfCode",
    "#java",
    "#python",
    "#Amazon",
    
  ];

  const [selectedChannel, setSelectedChannel] = useState(channels[0]);


  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  return (
    <div className="  w-56 bg-[#93c0e0] mx-auto ">
      <div className="h-screen text-white pt-1">
        {channels.map((channel, index) => (
          <div
            key={index}
            className={`py-2 px-4  m-4 cursor-pointer hover:bg-gray-700 hover:rounded-md ${
              channel === selectedChannel ? "bg-gray-700" : ""
            }`}
            onClick={() => handleChannelSelect(channel)}
          >
            {channel}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
