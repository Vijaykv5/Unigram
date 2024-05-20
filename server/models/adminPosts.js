const mongoose = require("mongoose");
const { link } = require("../routes/channel");

const AdminPostsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  preferredyear: {
    type: "string",
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
  },
  link : {
    type: String,
    required: true,
  
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const AdminPosts = mongoose.model("AdminPostDetails", AdminPostsSchema);
module.exports = AdminPosts;
