// const express = require("express");
// const router = express.Router();
// const UserAllDetails = require("../models/userAllDetails");
// const mongoose = require("mongoose");


// // Route to fetch user details and their posts
// router.get("/profile/:userId", async (req, res) => {
//   try {
//     const {userId} = req.params;
//     if (!mongoose.isValidObjectId(userId)) {
//       return res.status(400).json(userId + " is not a valid user ID");
//     }
//     console.log(userId);
//     // Find user details by userId
//     const user = await UserAllDetails.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     // Find posts by userId
   
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
