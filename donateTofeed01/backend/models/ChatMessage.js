const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  user: String,         // e.g., "Mr. Pereira" or user email/id
  message: String,      // Chat text
  from: String,         // 'user' or 'assistant'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
