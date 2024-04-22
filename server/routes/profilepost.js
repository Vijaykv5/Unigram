const express = require("express");
const router = express.Router();
const UserCreatePost = require("../models/userCreatePost");

// Route to fetch user created posts by userId
router.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await UserCreatePost.find({ userid: userId }).sort({
      dateTime: -1,
    });
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching user created posts:", error);
    res.status(500).json({ error: "Failed to fetch user created posts" });
  }
});

module.exports = router;
