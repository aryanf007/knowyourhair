const express = require('express');
const auth = require('../middleware/auth');
const Routine = require('../models/Routine');
const router = express.Router();

// Save a generated routine
router.post('/', auth, async (req, res) => {
  try {
    const routine = await Routine.create({ user: req.userId, ...req.body });
    res.status(201).json(routine);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch saved routines for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.userId }).sort('-createdAt');
    res.json(routines);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;