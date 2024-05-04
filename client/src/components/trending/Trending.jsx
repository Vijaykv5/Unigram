import React, { useState } from "react";

const Trending = ({ channels, onChannelSelect }) => {
  return (
    <div className="w-56 bg-[#93c0e0] mx-auto">
      <div className="h-screen text-white pt-1">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="py-2 px-4 m-4 cursor-pointer hover:bg-gray-700 hover:rounded-md"
            onClick={() => onChannelSelect(channel)}
          >
            {channel}
            <div className="h-0.5 bg-white my-1">

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Trending;


