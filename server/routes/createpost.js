const express = require("express");
const router = express.Router();
const UserCreatePost = require("../models/userCreatePost");

const createUserPost = async (req, res) => {
  try {
    const { userid, description, images, username, keyword } = req.body; // Retrieve user_id, description, and images from request body

    // Create user post in the database
    const userCreatedPost = await UserCreatePost.create({

      userid,
      username,
      description,
      images,
      keyword
    });
      console.log(req.body);

    // Respond with the created user post
    res.status(201).json({ userCreatedPost });
    console.log("User created successfully:", userCreatedPost);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST route for creating user posts
router.post("/home", createUserPost);

module.exports = router;
