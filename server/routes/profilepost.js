const express = require("express");
const router = express.Router();
const UserAllDetails = require("../models/userAllDetails");
const UserCreatePost = require("../models/userCreatePost");
const mongoose = require("mongoose");

// Route to fetch both user details and user posts by userId
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    // No need to check for valid ObjectId here

    // Find user details by userId
    const user = await UserAllDetails.findOne({ user_id: userId });

    console.log('user:'+user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find user created posts by userId
    const userPosts = await UserCreatePost.find({ userid: userId }).sort({
      dateTime: -1,
    });

    res.status(200).json({ user: user, posts: userPosts });
  } catch (error) {
    console.error("Error fetching user details and posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
