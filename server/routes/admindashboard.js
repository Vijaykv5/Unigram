const express = require("express");
const router = express.Router();
const UserAllDetails = require("../models/userDetails");

router.get("/profile", async (req, res) => {
    console.log("hello");

  try {
    const totalUsers = await UserAllDetails.find().countDocuments();
    return res.json({ value: totalUsers });
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
