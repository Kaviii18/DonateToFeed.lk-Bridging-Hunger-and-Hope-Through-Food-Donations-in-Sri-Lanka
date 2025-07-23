const mongoose = require("mongoose");
const availableDonationSchema = new mongoose.Schema({
  img: String,
  location: String,
  category: String,
  availability: String,
  amount: String,
  expiry: String,  // new!
  note: String,
});
module.exports = mongoose.model("AvailableDonation", availableDonationSchema);
