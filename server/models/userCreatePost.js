// userCreatePost.js
const mongoose = require("mongoose");

const userCreatePostSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
    image: [{type: String}],
});

const UserCreatePost = mongoose.model("UserCreatePost", userCreatePostSchema);

module.exports = UserCreatePost;
