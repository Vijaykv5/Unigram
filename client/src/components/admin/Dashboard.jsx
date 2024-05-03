import React, { useEffect } from "react";

const Dashboard = () => {
  // You can add state variables and functions to manage posts and channels here


  const neew = async() => {

    const admin = await fetch("http://localhost:3002/home")
    console.log(admin)
  }
  neew();
//  useEffect()=>{
//  neew();
//  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Section for managing posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Posts</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Add functionality to manage posts here */}
          <p className="text-gray-700">You can manage your posts here.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View Posts
          </button>
        </div>
      </section>

      {/* Section for managing channels */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Manage Channels
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Add functionality to manage channels here */}
          <p className="text-gray-700">You can manage your channels here.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View Channels
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
