// Backend: routes/channels.js

const express = require("express");
const router = express.Router();
const Channel = require("../models/channels");

router.post("/admin/channel", async (req, res) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res
      .status(400)
      .json({ success: false, message: "Channel name is required" });
  }

  const newChannel = new Channel({
    Channels: channelName,
  });

  try {
    const savedChannel = await newChannel.save();
    res.json({ success: true, newChannel: savedChannel });
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get("/admin/channel", async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.error("Error fetching channels:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.delete("/admin/channel", async (req, res) => {
    const { channelName } = req.body;
    
    if (!channelName) {
        return res
        .status(400)
        .json({ success: false, message: "Channel name is required" });
    }
    
    try {
        const deletedChannel = await Channel.findOneAndDelete({ Channels: channelName });
        if (deletedChannel) {
        res.json({ success: true, deletedChannel: deletedChannel });
        } else {
        res.status(404).json({ success: false, message: "Channel not found" });
        }
    } catch (error) {
        console.error("Error deleting channel:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
