const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// @route   POST /api/login
// @desc    Authenticate user (Admin/Doner/Receiver)
// @access  Public
router.post('/', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 1. Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // 4. Role check
    if (user.role !== role) {
      return res.status(403).json({ error: 'Role mismatch. Please select the correct role.' });
    }

    // 5. Prepare user data excluding password
    const { password: _, ...userData } = user.toObject();

    // 6. Send response
    res.status(200).json({ user: userData });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
