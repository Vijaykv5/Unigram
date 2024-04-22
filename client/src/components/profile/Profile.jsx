// Profile.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams(); 
  console.log(userId);// Get userId from URL parameter

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from API based on userId
    fetch(`/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserDetails(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  return (
    <div>
      <h2>User Profile</h2>
      {userDetails ? (
        <div>
          <p>User ID: {userDetails.user_id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
