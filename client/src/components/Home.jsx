import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import MainContainer from "./MainContainer";
import RightSidebar from "./RightSidebar";
import FeedPost from "./FeedPost";

const Post = () => {
  return (
    <div>
      <Navbar />
      <div className="flex m-5">
        <div className="w-72 m-3  h-screen">
          <LeftSidebar />
        </div>
        <div className="w-3/4 m-3 bg-gray-200 h-screen">
          <MainContainer />
          <div className="my-8">
            <FeedPost />
          </div>
        </div>
        <div className="w-60 m-3 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Post;
