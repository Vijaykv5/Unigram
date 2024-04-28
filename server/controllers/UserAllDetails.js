const UserAllDetails = require("../models/userAllDetails");

exports.createUser = async (req, res) => {


  try {
    console.log("req-body :",req.body);
    const {
      user_id,
      name,
      email,
      password,
      image,
      branch,
      semester,
      linkedin,
      github,
    } = req.body;

    const newUser = new UserAllDetails({
      user_id,
      name,
      email,
      password,
      image,
      branch,
      semester,
      linkedin,
      github,
    });

    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
