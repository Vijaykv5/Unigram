const mongoose = require("mongoose");

const AdminPostsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
}) 

const AdminPosts = mongoose.model("AdminPostDetails", AdminPostsSchema);
module.exports = AdminPosts;
