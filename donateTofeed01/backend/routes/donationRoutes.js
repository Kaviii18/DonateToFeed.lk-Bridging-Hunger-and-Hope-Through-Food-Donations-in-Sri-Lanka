const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Donation = require('../models/Donation');

const router = express.Router();

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/donations (with image upload)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // If coming from form-data: req.body contains strings, req.file the image file
    const donation = new Donation({
      ...req.body,
      image: req.file ? req.file.filename : "" // store image file name (not path)
    });
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error("Donation create error:", err);
    res.status(500).json({ error: "Could not save donation." });
  }
});

// GET /api/donations (all donations, newest first)
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error("Get donations error:", err);
    res.status(500).json({ error: "Error loading donations." });
  }
});

module.exports = router;
