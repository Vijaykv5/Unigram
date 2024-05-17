// messageRouter.js
const express = require("express");
const router = express.Router();
const Message = require("../models/channelschat");

// Create a new message
router.post("/channel", async (req, res) => {
  try {
    const { user_id, name, channel, image, message, timestamp } = req.body;
    const newMessage = new Message({
      user_id,
      name,
      channel,
      image,
      message,
      timestamp,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get messages for a specific channel
router.get("/channel/:channel", async (req, res) => {
  try {
    const channel = req.params.channel;
    const messages = await Message.find({ channel });
    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
