const express = require('express');
const auth = require('../middleware/auth');
const TestResult = require('../models/TestResult');
const router = express.Router();

// Create a new test result
router.post('/', auth, async (req, res) => {
  try {
    const { porosity } = req.body;
    const result = await TestResult.create({ user: req.userId, porosity });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch test results for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.userId }).sort('-createdAt');
    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;