const express = require("express");
const router = express.Router();
const UserCreatePost = require("../models/userCreatePost");

// Route to fetch user created posts
router.get("/home", async (req, res) => {
  try {
    const posts = await UserCreatePost.find(); // Retrieve all user created posts from the database
    res.json(posts);
  } catch (error) {
    console.error("Error fetching user created posts:", error);
    res.status(500).json({ error: "Failed to fetch user created posts" });
  }
});

module.exports = router;
