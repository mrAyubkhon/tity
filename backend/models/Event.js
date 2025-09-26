const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  time: {
    start: String,
    end: String
  },
  location: {
    name: String,
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  type: {
    type: String,
    enum: ['personal', 'professional', 'social', 'travel', 'celebration', 'other'],
    default: 'personal'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  color: {
    type: String,
    default: '#DC2626'
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'notification', 'sms']
    },
    time: Date,
    message: String
  }],
  attendees: [{
    name: String,
    email: String,
    status: {
      type: String,
      enum: ['invited', 'accepted', 'declined', 'maybe']
    }
  }]
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ date: 1, isPublic: 1 });
eventSchema.index({ type: 1, status: 1 });
eventSchema.index({ date: 1, endDate: 1 });

module.exports = mongoose.model('Event', eventSchema);
