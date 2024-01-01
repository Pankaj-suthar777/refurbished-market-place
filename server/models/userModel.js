const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "active",
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
