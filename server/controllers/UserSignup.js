const User = require("../models/userDetails");

const signupUser = async (req, res) => {
  const { user_id, name, email, password } = req.body;
  try {
    const user = await User.create({ user_id,name, email, password });
    res.status(201).json({ user });
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
};
