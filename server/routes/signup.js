const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/UserSignup");

router.post("/signup", signupUser);
module.exports = router;
