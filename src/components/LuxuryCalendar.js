import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';

const LuxuryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    time: '',
    type: 'personal',
    color: '#DC2626'
  });

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: "Luxury Photo Shoot",
      description: "Professional photoshoot for the new collection",
      date: new Date(2024, 11, 15),
      time: "10:00 AM",
      type: "professional",
      color: "#DC2626"
    },
    {
      id: 2,
      title: "Elegant Dinner Party",
      description: "Exclusive dinner with close friends",
      date: new Date(2024, 11, 20),
      time: "7:00 PM",
      type: "social",
      color: "#B91C1C"
    },
    {
      id: 3,
      title: "Fashion Week",
      description: "Attending the latest fashion week event",
      date: new Date(2024, 11, 25),
      time: "2:00 PM",
      type: "professional",
      color: "#DC2626"
    },
    {
      id: 4,
      title: "Personal Spa Day",
      description: "Relaxing spa treatment and wellness",
      date: new Date(2024, 11, 28),
      time: "11:00 AM",
      type: "personal",
      color: "#059669"
    }
  ];

  // Helper functions to replace date-fns
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatShortDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  useEffect(() => {
    // Load events from localStorage or use sample data
    const savedEvents = localStorage.getItem('titu-events');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents).map(event => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(parsedEvents);
    } else {
      setEvents(sampleEvents);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('titu-events', JSON.stringify(events));
  }, [events]);

  // Get events for selected date
  const getDayEvents = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Custom tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const dayEvents = getDayEvents(date);
    if (dayEvents.length === 0) return null;

    return (
      <div className="flex justify-center mt-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full mx-0.5"
            style={{ backgroundColor: event.color }}
            title={event.title}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mx-0.5" />
        )}
      </div>
    );
  };

  // Custom tile class name
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';

    const dayEvents = getDayEvents(date);
    let classes = 'relative';
    
    if (dayEvents.length > 0) {
      classes += ' bg-luxury-red/5 border-luxury-red/20';
    }

    if (isSameDay(date, new Date())) {
      classes += ' bg-luxury-red/10 border-luxury-red/30';
    }

    return classes;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error('Please enter an event title');
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      date: selectedDate
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      description: '',
      time: '',
      type: 'personal',
      color: '#DC2626'
    });
    setShowAddEvent(false);
    toast.success('Event added successfully!');
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast.success('Event deleted successfully!');
  };

  const dayEvents = getDayEvents(selectedDate);

  return (
    <section id="calendar" className="section-padding bg-gradient-to-br from-soft-white to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary text-luxury-red mb-4">
            Luxury Calendar
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-luxury-red mx-auto rounded-full"
          ></motion.div>
          <p className="text-elegant mt-6 max-w-2xl mx-auto">
            Discover Titu's elegant events and special moments throughout the year.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="luxury-card p-6">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                className="luxury-calendar"
                calendarType="US"
                showNeighboringMonth={false}
              />
            </div>
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Selected Date Info */}
            <div className="luxury-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-elegant font-semibold text-gray-800">
                  {formatDate(selectedDate)}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddEvent(true)}
                  className="bg-luxury-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-elegant-red transition-colors duration-300"
                >
                  + Add Event
                </motion.button>
              </div>
              
              {dayEvents.length > 0 ? (
                <div className="space-y-3">
                  {dayEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md"
                      style={{ 
                        borderColor: event.color,
                        backgroundColor: `${event.color}10`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: event.color }}
                          ></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{event.title}</h4>
                            {event.time && (
                              <p className="text-sm text-gray-600">{event.time}</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No events scheduled for this day
                </p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="luxury-card p-6">
              <h3 className="text-lg font-elegant font-semibold text-gray-800 mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events
                  .filter(event => event.date > new Date())
                  .sort((a, b) => a.date - b.date)
                  .slice(0, 5)
                  .map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-600">
                          {formatShortDate(event.date)} {event.time && `• ${event.time}`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddEvent(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-elegant font-semibold text-gray-800">
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="text-gray-500 hover:text-luxury-red transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="form-input"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="form-textarea"
                    rows={3}
                    placeholder="Enter event description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="form-input"
                    placeholder="e.g., 7:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                    className="form-input"
                  >
                    <option value="personal">Personal</option>
                    <option value="professional">Professional</option>
                    <option value="social">Social</option>
                    <option value="travel">Travel</option>
                    <option value="celebration">Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {['#DC2626', '#B91C1C', '#059669', '#7C3AED', '#EA580C'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewEvent(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newEvent.color === color ? 'border-gray-400' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="luxury-btn"
                >
                  Add Event
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .luxury-calendar {
          width: 100%;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        
        .luxury-calendar .react-calendar__tile {
          border: 1px solid #f1f5f9;
          padding: 8px;
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .luxury-calendar .react-calendar__tile:hover {
          background-color: #fee2e2;
          border-color: #dc2626;
        }
        
        .luxury-calendar .react-calendar__tile--active {
          background-color: #dc2626 !important;
          color: white;
        }
        
        .luxury-calendar .react-calendar__tile--now {
          background-color: #fef2f2;
          color: #dc2626;
          font-weight: 600;
        }
        
        .luxury-calendar .react-calendar__navigation {
          margin-bottom: 1rem;
        }
        
        .luxury-calendar .react-calendar__navigation button {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .luxury-calendar .react-calendar__navigation button:hover {
          background-color: #b91c1c;
          transform: translateY(-1px);
        }
        
        .luxury-calendar .react-calendar__month-view__weekdays {
          margin-bottom: 0.5rem;
        }
        
        .luxury-calendar .react-calendar__month-view__weekdays__weekday {
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  );
};

export default LuxuryCalendar;