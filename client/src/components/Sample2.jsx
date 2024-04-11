import React, { useEffect, useState } from "react";

const Sample2 = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/usersList");
      const data = await response.json(); // Parse the JSON data from the response
      setUsers(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sample2;
