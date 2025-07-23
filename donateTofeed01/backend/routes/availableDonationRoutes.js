const express = require("express");
const router = express.Router();
const AvailableDonation = require("../models/AvailableDonation");

// GET all available donations
router.get("/", async (req, res) => {
  const donations = await AvailableDonation.find();
  res.json(donations);
});

// POST new available donation (admin only, in real-world check JWT or session)
router.post("/", async (req, res) => {
  try {
    const donation = new AvailableDonation(req.body); // supports expiry/note etc.
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;