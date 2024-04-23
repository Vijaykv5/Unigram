const User = require("../models/userDetails");

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const userDetails = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            password: user.password,
          };
          
          res.json({ success: true, userDetails: userDetails });
        } else {
          res
            .status(401)
            .json({ success: false, message: "The password is incorrect" });
        }
      } else {
        res.status(404).json({ success: false, message: "No record existed" });
      }
    })
    .catch((error) => {
      console.error("Error checking user:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "An error occurred. Please try again later.",
        });
    });
};

module.exports = {
  loginUser,
};
