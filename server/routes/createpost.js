const express = require("express");
const router = express.Router();
const UserCreatePost = require("../models/userCreatePost");

const UserCreatedPost = async (req, res) => {
  try {
    // Extract description and images from the request body
    const { user_id, description, images } = req.body;
    console.log(req.body);

    // Here you may need to process the images array to store them properly in your database
    // For simplicity, let's assume you're storing them as an array of strings
    // You can store them in your database according to your schema

    // Create a new user created post document
    const usercreatedPosts = await UserCreatePost.create({
      user_id,
      description,
      images,
    });

    // Send a success response
    res.status(201).json({ usercreatedPosts });
    console.log("User created successfully:", usercreatedPosts);
  } catch (error) {
    // Handle any errors
    console.log(req.body);
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

router.post("/home", UserCreatedPost);

module.exports = router;
