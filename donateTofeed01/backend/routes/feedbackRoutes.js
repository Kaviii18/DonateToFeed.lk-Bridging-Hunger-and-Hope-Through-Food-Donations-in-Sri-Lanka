const express = require('express');
const multer = require('multer');
const path = require('path');
const Feedback = require('../models/Feedback');

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure 'uploads' dir exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/feedback
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, comment, rating } = req.body;
    if (!name || !email || !comment || !rating) {
      return res.status(400).json({ error: "All fields required" });
    }
    const feedback = new Feedback({
      name,
      email,
      comment,
      rating: Number(rating),
      image: req.file ? req.file.filename : "",
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted!", feedback });
  } catch (err) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to load feedback" });
  }
});

module.exports = router;
