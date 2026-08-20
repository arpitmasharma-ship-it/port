const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, authorize('admin'), upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.id };
    if (req.file) data.avatar = req.file.filename;
    if (req.body.rating) data.rating = parseInt(req.body.rating);
    if (req.body.featured) data.featured = req.body.featured === 'true' || req.body.featured === true;
    const testimonial = await Testimonial.create(data);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, authorize('admin'), upload.single('avatar'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.avatar = req.file.filename;
    if (req.body.rating) updateData.rating = parseInt(req.body.rating);
    if (req.body.featured) updateData.featured = req.body.featured === 'true' || req.body.featured === true;
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
