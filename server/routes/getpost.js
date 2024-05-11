

const express = require("express");
const router = express.Router();
const UserCreatePost = require("../models/userCreatePost");


router.get("/home", async (req, res) => {
  try {
    const posts = await UserCreatePost.find().sort({ dateTime: -1 });;
    res.json(posts);
  } catch (error) {
    console.error("Error fetching user created posts:", error);
    res.status(500).json({ error: "Failed to fetch user created posts" });
  }
});

// Route to update post likes
router.put("/home/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log("post liked",postId);

  try {
    const post = await UserCreatePost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update likes count
    post.likes += 1;
    await post.save();

    res.json({ message: "Post liked successfully", likes: post.likes });
  } catch (error) {
    console.error("Error liking user created post:", error);
    res.status(500).json({ error: "Failed to like user created post" });
  }
});



router.put("/home/:postId/unlike", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await UserCreatePost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update likes count
    if (post.likes > 0) {
      post.likes -= 1;
      await post.save();
    }

    res.json({ message: "Post unliked successfully", likes: post.likes });
  } catch (error) {
    console.error("Error unliking user created post:", error);
    res.status(500).json({ error: "Failed to unlike user created post" });
  }
});


// Route to update post comments


router.put("/home/:postId/comment", async (req, res) => {
  const { postId } = req.params;
  console.log("post commented",postId);
  const { content, name, time, day, profileImage, profilelink } = req.body;
  console.log(req.body)

  try {
    const post = await UserCreatePost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add new comment
    post.comments.push({
      name: name,
      content: content,
      dateTime: new Date(),
      profileImage: profileImage,
      profilelink: profilelink,
    });

    await post.save();

    res.json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error adding comment to user created post:", error);
    res
      .status(500)
      .json({ error: "Failed to add comment to user created post" });
  }
});




module.exports = router;
