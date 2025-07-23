const mongoose = require('mongoose');

const feedRequestSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  receiverName: String,
  receiverEmail: String,
  receiverPhone: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FeedRequest', feedRequestSchema);

