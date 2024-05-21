import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { Base_URL } from "../../../utils/constants";


const UsersContent = () => {
  const [totalUsers, setTotalUsers] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${Base_URL}/admin/users`);
        const data = await response.json();
        setTotalUsers(data.totalUsers);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Users</h2>
        <p>Total number of users: {totalUsers}</p>
      </div>
      <div className="grid grid-cols-3 p-12 md:grid-cols-4   text-black shadow-lg lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold">Name: {user.name}</p>
            <p className="flex p-3  gap-2">
              <MdEmail size={24} />
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersContent;
