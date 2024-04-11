const UserCreatePost = require("../models/userCreatePost");

const UserCreatedPost = async (req, res) => {
  console.log(req.body);
//   try {
//     // Assuming images is an array of image URLs
//     const usercreatedPosts = await UserCreatePost.create({
//       description,
//       images,
//     });
//     res.status(201).json({ usercreatedPosts });
//     console.log("User created successfully:", usercreatedPosts);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: error.message });
//   }
};

module.exports = {
  UserCreatedPost,
};
