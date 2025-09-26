const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Portrait', 'Lifestyle', 'Fashion', 'Style', 'Moments', 'Beauty', 'Elegance', 'Grace', 'Living', 'Events']
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: function() {
      return this.type === 'video';
    }
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  tags: [{
    type: String,
    trim: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  metadata: {
    camera: String,
    location: String,
    photographer: String,
    event: String
  }
}, {
  timestamps: true
});

// Indexes for better performance
mediaSchema.index({ category: 1, isActive: 1 });
mediaSchema.index({ type: 1, isActive: 1 });
mediaSchema.index({ isFeatured: 1, isActive: 1 });
mediaSchema.index({ uploadDate: -1 });

module.exports = mongoose.model('Media', mediaSchema);
