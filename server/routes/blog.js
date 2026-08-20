const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const { category, published } = req.query;
    let query = {};
    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    blog.views += 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, authorize('admin'), upload.single('coverImage'), async (req, res) => {
  try {
    const data = { ...req.body, user: req.user.id };
    if (req.file) data.coverImage = req.file.filename;
    if (req.body.tags && typeof req.body.tags === 'string') {
      data.tags = req.body.tags.split(',').map(t => t.trim());
    }
    if (req.body.published) {
      data.published = req.body.published === 'true' || req.body.published === true;
      if (data.published) data.publishedAt = new Date();
    }
    const blog = await Blog.create(data);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, authorize('admin'), upload.single('coverImage'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.coverImage = req.file.filename;
    if (req.body.tags && typeof req.body.tags === 'string') {
      updateData.tags = req.body.tags.split(',').map(t => t.trim());
    }
    if (req.body.published) {
      updateData.published = req.body.published === 'true' || req.body.published === true;
      if (updateData.published && !req.body.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
