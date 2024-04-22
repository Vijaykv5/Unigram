// userCreatePost.js
const mongoose = require("mongoose");

const userCreatePostSchema = new mongoose.Schema({
  userid:{
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  keyword: {
    type: [String],
    // required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user_id: String,
      comment: String,
      dateTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  links: [String],
});

const UserCreatePost = mongoose.model("UserCreatePost", userCreatePostSchema);

module.exports = UserCreatePost;
