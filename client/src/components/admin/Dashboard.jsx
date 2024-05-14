import React, { useState } from "react";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import { AiOutlineBell, AiOutlineSetting } from "react-icons/ai";
import { IoMdChatbubbles } from "react-icons/io";
import UsersContent from "./admincomponents/UsersContent";
import PostsContent from "./admincomponents/PostsContent";
import SettingsContent from "./admincomponents/SettingsContent";
import MessagesContent from "./admincomponents/MessagesContent";

const Dashboard = () => {
  const [selected, setSelected] = useState("users");

  const handleItemClick = (item) => {
    setSelected(item);
  };

  return (
    <div className="flex h-screen  text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-4  ">
        <div className=" p-4">
          <span className="text-5xl font-bold text-white">UNI</span>
          <span className="text-5xl font-bold text-[#7BB7E3]">GRAM</span>
        </div>

        <div className="my-7 mb-2">
          <h1 className="text-2xl font-bold text-white p-4"></h1>
        </div>

        <div
          className={`sidebar-item flex items-center py-2  px-4 rounded ${
            selected === "users" && "bg-gray-700"
          }`}
          onClick={() => handleItemClick("users")}
        >
          <FaUsers className="mr-2" size={24} />
          <span>Users</span>
        </div>
        <div
          className={`sidebar-item flex items-center py-2 px-4 rounded ${
            selected === "notifications" && "bg-gray-700"
          }`}
          onClick={() => handleItemClick("notifications")}
        >
          <AiOutlineBell className="mr-2" size={24} />
          <span>Notifications</span>
        </div>
        <div
          className={`sidebar-item flex items-center py-2 px-4 rounded ${
            selected === "messages" && "bg-gray-700"
          }`}
          onClick={() => handleItemClick("messages")}
        >
          <IoMdChatbubbles className="mr-2" size={24} />
          <span>Messages</span>
        </div>
        <div
          className={`sidebar-item flex items-center py-2 px-4 rounded ${
            selected === "posts" && "bg-gray-700"
          }`}
          onClick={() => handleItemClick("posts")}
        >
          <FaFileAlt className="mr-2" size={24} />
          <span>Posts</span>
        </div>
        <div
          className={`sidebar-item flex items-center py-2 px-4 rounded ${
            selected === "settings" && "bg-gray-700"
          }`}
          onClick={() => handleItemClick("settings")}
        >
          <AiOutlineSetting className="mr-2" size={24} />
          <span>Settings</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {selected === "users" && <UsersContent />}
        {/* {selected === "notifications" && <NotificationsContent />} */}
        {selected === "messages" && <MessagesContent/>}
        {selected === "posts" && <PostsContent />}
        {selected === "settings" && <SettingsContent />}
      </div>
    </div>
  );
};

export default Dashboard;
