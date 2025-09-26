const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Get all events with optional date filtering
router.get('/', async (req, res) => {
  try {
    const { 
      startDate, 
      endDate, 
      type, 
      status,
      month,
      year 
    } = req.query;

    let query = { isPublic: true };

    // Date filtering
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59);
      query.date = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
    }

    if (type) query.type = type;
    if (status) query.status = status;

    const events = await Event.find(query)
      .populate('media', 'url thumbnail title type')
      .sort({ date: 1 })
      .exec();

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get events for specific month
router.get('/month/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const events = await Event.find({
      isPublic: true,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    })
    .populate('media', 'url thumbnail title type')
    .sort({ date: 1 })
    .exec();

    res.json(events);
  } catch (error) {
    console.error('Get monthly events error:', error);
    res.status(500).json({ error: 'Failed to fetch monthly events' });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('media', 'url thumbnail title type')
      .exec();

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      endDate,
      time,
      location,
      type,
      priority,
      color,
      media,
      reminders,
      attendees
    } = req.body;

    const event = new Event({
      title,
      description,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : undefined,
      time,
      location,
      type: type || 'personal',
      priority: priority || 'medium',
      color: color || '#DC2626',
      media: media || [],
      reminders: reminders || [],
      attendees: attendees || []
    });

    await event.save();
    await event.populate('media', 'url thumbnail title type');

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      endDate,
      time,
      location,
      type,
      status,
      priority,
      color,
      media,
      reminders,
      attendees
    } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date) updateData.date = new Date(date);
    if (endDate) updateData.endDate = new Date(endDate);
    if (time) updateData.time = time;
    if (location) updateData.location = location;
    if (type) updateData.type = type;
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (color) updateData.color = color;
    if (media) updateData.media = media;
    if (reminders) updateData.reminders = reminders;
    if (attendees) updateData.attendees = attendees;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('media', 'url thumbnail title type');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Get upcoming events
router.get('/upcoming/limit/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 5;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      isPublic: true,
      date: { $gte: today },
      status: { $in: ['upcoming', 'ongoing'] }
    })
    .populate('media', 'url thumbnail title type')
    .sort({ date: 1 })
    .limit(limit)
    .exec();

    res.json(events);
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
  }
});

module.exports = router;
