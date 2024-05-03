const express = require("express");
const router = express.Router();
const userPost =require("../models/userCreatePost");

router.post("/selected-channel", async (req, res) => {
  try {
    const { channel } = req.body;
    console.log("Selected Channel:", channel);
    return res.status(200).json({"channel":channel})
  } catch (e){
    console.log("Error",error)
  }
});




router.get("/posts/:channel", async (req, res) => {
  try {
    const channel = req.params.channel;
    // Assuming you have a Post model defined
    const posts = await userPost.find({ keyword: {$in:[channel]} });
    console.log(posts);
    return res.json(posts);
    
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
