const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// ✅ GET all users (for User Management dashboard)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// ✅ Sign Up (Create User)
router.post('/', async (req, res) => {
  const { name, email, address, contact, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists.' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, address, contact, password: hashed, role
    });
    const { password: _, ...userData } = user.toObject();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// ✅ PUT update user
router.put('/:id', async (req, res) => {
  const { name, email, address, contact, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, address, contact, role },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

// ✅ DELETE user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed.' });
  }
});

module.exports = router;
