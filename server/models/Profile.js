const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  resume: {
    type: String
  },
  email: String,
  phone: String,
  location: String,
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    dribbble: String
  },
  about: {
    description: String,
    stats: [{
      label: String,
      value: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
