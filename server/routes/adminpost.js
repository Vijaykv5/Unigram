const express = require("express");
const Router = express.Router();
const AdminPost = require("../models/adminPosts");

// Route handler for posting new admin posts
Router.post("/admin/posts", async (req, res) => {
  const {
    heading,
    description,
    company,
    skills,
    preferredyear,
    duration,
    stipend,
  } = req.body;

  try {
    const newPost = new AdminPost({
      heading,
      description,
      company,
      skills,
      preferredyear,
      duration,
      stipend,
      active : true,
    });

    await newPost.save();
    res.status(201).json({ success: true, newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route handler for fetching admin posts
Router.get("/admin/posts", async (req, res) => {
  try {
    const posts = await AdminPost.find();
    res.status(200).json(posts); // Sending posts as JSON
  } catch (err) {
    console.error("Error fetching admin posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = Router;
