const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: "Message received! Thank you." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

module.exports = router;
