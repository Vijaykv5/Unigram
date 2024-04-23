const express = require("express");
const router = express.Router();
const UserAllDetails = require("../models/userAllDetails");
const UserCreatePost = require("../models/userCreatePost");


const createUserDetails = async (req, res) => {
  console.log(req.body);  
  try {
 
    const { user_id, name, email, image, branch, semester } =
      req.body;

   
    const newUser = await UserAllDetails.create({
      user_id,
      name,
      email,
      image,
      branch,
      semester,
    });

    
    res
      .status(201)
      .json({ newUser });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const createUserPost = async (req, res) => {
  try {
    const { userid, description,userimage, images, username, keyword } = req.body;


    const userCreatedPost = await UserCreatePost.create({
      userid,
      username,
      userimage,
      description,
      images,
      keyword,
    });

    
    res.status(201).json({ userCreatedPost });
    console.log("User created successfully:", userCreatedPost);
  } catch (error) {
    console.error("Error creating user post:", error);
    res.status(500).json({ error: error.message });
  }
};

router.post("/home", createUserDetails);

router.post("/home/:id", createUserPost);

module.exports = router;
