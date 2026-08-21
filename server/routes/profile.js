const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    const User = require('../models/User');

    let profiles = await Profile.find().populate('user', 'name email');
    let profile = profiles.find((p) => p.user) || profiles[0];

    // Remove stale/duplicate profiles left from old admin accounts
    if (profile && profiles.length > 1) {
      await Profile.deleteMany({ _id: { $ne: profile._id } });
    }

    if (!profile) {
      const admin = await User.findOne();
      if (!admin) {
        return res.json({ success: true, data: null });
      }
      profile = await Profile.create({
        user: admin._id,
        name: 'Your Name',
        title: 'Full Stack Developer',
        bio: 'Passionate developer building amazing things.'
      });
    } else if (!profile.user) {
      // Profile belongs to a deleted user -> re-link to current admin
      const admin = await User.findOne();
      if (admin) {
        profile = await Profile.findByIdAndUpdate(
          profile._id,
          { user: admin._id },
          { new: true }
        ).populate('user', 'name email');
      }
    }

    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private
router.put('/', protect, authorize('admin'), upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.avatar?.[0]) {
      updateData.avatar = req.files.avatar[0].filename;
    }
    if (req.files?.resume?.[0]) {
      updateData.resume = req.files.resume[0].filename;
    }
    if (req.body.social && typeof req.body.social === 'string') {
      updateData.social = JSON.parse(req.body.social);
    }
    if (req.body.about && typeof req.body.about === 'string') {
      updateData.about = JSON.parse(req.body.about);
    }

    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    // Ensure only the current admin's profile remains
    await Profile.deleteMany({ _id: { $ne: profile._id } });

    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
