const express = require('express');
const FeedRequest = require('../models/FeedRequest');
const router = express.Router();

// POST /api/feed-requests (make a request for food)
router.post('/', async (req, res) => {
  try {
    const { donationId, receiverName, receiverEmail, receiverPhone } = req.body;
    const request = new FeedRequest({
      donationId, receiverName, receiverEmail, receiverPhone
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    console.error("FeedRequest create error:", err);
    res.status(500).json({ error: "Could not submit request." });
  }
});

// GET /api/feed-requests (all requests, optional filter by receiver email)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.email) filter.receiverEmail = req.query.email;
    const requests = await FeedRequest.find(filter).populate('donationId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Error loading requests." });
  }
});

module.exports = router;
