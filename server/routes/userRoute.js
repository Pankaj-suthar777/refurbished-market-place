const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// new user

router.post("/register", async (req, res) => {
  try {
    //check if user exist already
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.getSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    //save user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
