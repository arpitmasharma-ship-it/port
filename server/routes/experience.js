const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: experience });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.responsibilities && typeof req.body.responsibilities === 'string') {
      updateData.responsibilities = req.body.responsibilities.split(',');
    }
    if (req.body.technologies && typeof req.body.technologies === 'string') {
      updateData.technologies = req.body.technologies.split(',');
    }
    if (req.body.current) {
      updateData.current = req.body.current === 'true' || req.body.current === true;
    }
    const experience = await Experience.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: experience });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
