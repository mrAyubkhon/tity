import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { calendarAPI } from '../services/api';
import 'react-calendar/dist/Calendar.css';

const LuxuryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [monthEvents, setMonthEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events for the current month
  useEffect(() => {
    const fetchMonthEvents = async () => {
      setLoading(true);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const monthEventsData = await calendarAPI.getMonthlyEvents(year, month);
        setMonthEvents(monthEventsData);
      } catch (error) {
        console.error('Error fetching monthly events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthEvents();
  }, [selectedDate]);

  // Get events for selected date
  useEffect(() => {
    const dayEvents = monthEvents.filter(event => 
      isSameDay(new Date(event.date), selectedDate)
    );
    setEvents(dayEvents);
  }, [selectedDate, monthEvents]);

  // Custom tile content for calendar
  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const dayEvents = monthEvents.filter(event => 
      isSameDay(new Date(event.date), date)
    );

    if (dayEvents.length === 0) return null;

    return (
      <div className="flex justify-center mt-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full mx-0.5"
            style={{ backgroundColor: event.color || '#DC2626' }}
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

    const dayEvents = monthEvents.filter(event => 
      isSameDay(new Date(event.date), date)
    );

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
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

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
                formatShortWeekday={(locale, date) => 
                  format(date, 'EEE', { locale })
                }
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
              <h3 className="text-xl font-elegant font-semibold text-gray-800 mb-4">
                {format(selectedDate, 'MMMM dd, yyyy')}
              </h3>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-luxury-red border-t-transparent rounded-full"
                  ></motion.div>
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-3">
                  {events.map((event) => (
                    <motion.div
                      key={event._id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleEventClick(event)}
                      className="p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md"
                      style={{ 
                        borderColor: event.color || '#DC2626',
                        backgroundColor: `${event.color || '#DC2626'}10`
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: event.color || '#DC2626' }}
                        ></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{event.title}</h4>
                          {event.time?.start && (
                            <p className="text-sm text-gray-600">
                              {event.time.start}
                              {event.time.end && ` - ${event.time.end}`}
                            </p>
                          )}
                        </div>
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
                {monthEvents
                  .filter(event => new Date(event.date) > new Date())
                  .slice(0, 5)
                  .map((event) => (
                    <motion.div
                      key={event._id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: event.color || '#DC2626' }}
                      ></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-600">
                          {format(new Date(event.date), 'MMM dd')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event Modal */}
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-elegant font-semibold text-gray-800">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-luxury-red transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">
                    {format(new Date(selectedEvent.date), 'MMMM dd, yyyy')}
                  </span>
                </div>

                {selectedEvent.time?.start && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">
                      {selectedEvent.time.start}
                      {selectedEvent.time.end && ` - ${selectedEvent.time.end}`}
                    </span>
                  </div>
                )}

                {selectedEvent.location?.name && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{selectedEvent.location.name}</span>
                  </div>
                )}

                {selectedEvent.description && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm">{selectedEvent.description}</p>
                  </div>
                )}
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
