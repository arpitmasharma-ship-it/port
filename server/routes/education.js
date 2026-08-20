const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json({ success: true, data: education });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const edu = await Education.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: edu });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.achievements && typeof req.body.achievements === 'string') {
      updateData.achievements = req.body.achievements.split(',');
    }
    if (req.body.current) {
      updateData.current = req.body.current === 'true' || req.body.current === true;
    }
    const edu = await Education.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!edu) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: edu });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
