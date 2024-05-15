// models/channels.js
const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  Channels: {
    type: String,
    required: true,
  },
});

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;
