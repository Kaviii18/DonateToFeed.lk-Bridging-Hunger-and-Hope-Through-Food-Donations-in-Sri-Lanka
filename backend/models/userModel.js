
// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  address: String,
  contact: String,
  password: String,
  role: String,
});

// ✅ Only compile if it doesn't exist already
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
