import React, { useEffect, useState } from "react";

const UsersContent = () => {
  const [totalUsers, setTotalUsers] = useState();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:3002/profile");
        const data = await response.json();
        setTotalUsers(data.value);
        console.log(data)
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalUsers();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <p>Total number of users: {totalUsers}</p>
      <p>List of users will be displayed here</p>
    </div>
  );
};

export default UsersContent;
