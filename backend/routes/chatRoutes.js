// backend/routes/chatRoutes.js
const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const router = express.Router();

// POST a new chat message
router.post('/', async (req, res) => {
  try {
    const { user, message, from } = req.body;
    if (!user || !message || !from) {
      return res.status(400).json({ error: "All fields required" });
    }
    const chatMsg = new ChatMessage({ user, message, from });
    await chatMsg.save();
    res.status(201).json(chatMsg);
  } catch (err) {
    console.error("Chat save error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET all chat messages for a user
router.get('/:user', async (req, res) => {
  try {
    const { user } = req.params;
    // Loads all messages for this user, both 'user' and 'assistant'
    const messages = await ChatMessage.find({ user }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Chat load error:", err);
    res.status(500).json({ error: "Failed to load messages" });
  }
});

router.delete('/:user', async (req, res) => {
  try {
    const { user } = req.params;
    await ChatMessage.deleteMany({ user });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear messages" });
  }
});

module.exports = router;
