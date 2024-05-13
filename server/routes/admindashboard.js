const UserAllDetails = require("../models/userAllDetails");

const getTotalUsers = async () => {
  try {
    const totalUsers = await UserAllDetails.countDocuments();
    return totalUsers;
  } catch (error) {
    console.error("Error getting total users:", error);
    return 0;
  }
};

router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    // No need to check for valid ObjectId here

    // Find user details by userId
    const user = await UserAllDetails.findOne({ user_id: userId });

    console.log("user:", user);

    // Get total users count
    const totalUsers = await getTotalUsers();

    res.json({ user, totalUsers });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
