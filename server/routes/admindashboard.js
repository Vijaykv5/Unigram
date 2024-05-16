const express = require("express");
const router = express.Router();
const UserAllDetails = require("../models/userDetails");

router.get("/admin/users", async (req, res) => {

  try {
    const totalUsers = await UserAllDetails.find().countDocuments();

    const users = await UserAllDetails.find({}, { password: 0 });

    return res.json({ totalUsers, users });
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
