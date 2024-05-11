const express = require("express");
const Router = express.Router();
const AdminPost = require("../models/adminPosts");

// Route handler for posting new admin posts
Router.post("/admin/posts", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Please provide a description" });
    }
    const newPost = new AdminPost({ content });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Admin post created successfully", post: newPost });
  } catch (err) {
    console.error("Error creating admin post:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route handler for fetching admin posts
Router.get("/internships", async (req, res) => {
  try {
    const posts = await AdminPost.find();
    res.status(200).json(posts); // Sending posts as JSON
  } catch (err) {
    console.error("Error fetching admin posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = Router;
