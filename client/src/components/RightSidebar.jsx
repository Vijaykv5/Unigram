import React from "react";
import Trending from "./trending/Trending";

const RightSidebar = () => {
  return (
    <div className="fixed">
      <div className="   bg-[#7BB7E3] w-56  text-white text-xl flex justify-center">
        <div className="p-2 font-Platypi font-semibold items-center">
          Trending Topics
        </div>
      </div>
      <div className="mt-2">
        <Trending/>
        </div>
    </div>
  );
};

export default RightSidebar;
