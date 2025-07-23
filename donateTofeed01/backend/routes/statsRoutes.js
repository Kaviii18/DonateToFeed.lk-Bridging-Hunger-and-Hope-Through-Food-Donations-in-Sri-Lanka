// routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/user-counts", async (req, res) => {
  try {
    const total = await User.countDocuments();
    const donors = await User.countDocuments({ role: "Doner" });
    const receivers = await User.countDocuments({ role: "Receiver" });
    const admins = await User.countDocuments({ role: "Admin" });

    res.json({ total, donors, receivers, admins });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user counts" });
  }
});

module.exports = router;
