import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Media API
export const mediaAPI = {
  // Get all media with pagination and filtering
  getMedia: async (params = {}) => {
    const response = await api.get('/media', { params });
    return response.data;
  },

  // Get single media by ID
  getMediaById: async (id) => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },

  // Upload media file
  uploadMedia: async (formData) => {
    const response = await api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update media
  updateMedia: async (id, data) => {
    const response = await api.put(`/media/${id}`, data);
    return response.data;
  },

  // Delete media
  deleteMedia: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },
};

// Calendar API
export const calendarAPI = {
  // Get all events
  getEvents: async (params = {}) => {
    const response = await api.get('/calendar', { params });
    return response.data;
  },

  // Get events for specific month
  getMonthlyEvents: async (year, month) => {
    const response = await api.get(`/calendar/month/${year}/${month}`);
    return response.data;
  },

  // Get single event by ID
  getEventById: async (id) => {
    const response = await api.get(`/calendar/${id}`);
    return response.data;
  },

  // Create new event
  createEvent: async (data) => {
    const response = await api.post('/calendar', data);
    return response.data;
  },

  // Update event
  updateEvent: async (id, data) => {
    const response = await api.put(`/calendar/${id}`, data);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await api.delete(`/calendar/${id}`);
    return response.data;
  },

  // Get upcoming events
  getUpcomingEvents: async (limit = 5) => {
    const response = await api.get(`/calendar/upcoming/limit/${limit}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
