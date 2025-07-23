const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  category: String,
  quantity: String,
  description: String,
  expiry: Date,
  condition: String,
  image: String, 
  pickup: String,
  dropoff: String,
  name: String,
  email: String,
  phone: String,
  agree: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
