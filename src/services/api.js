import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
};

// AI API
export const aiAPI = {
  getModels: () => api.get('/ai/models'),
  planTrip: (tripData) => api.post('/ai/plan-trip', tripData),
  getRecommendations: (destination, tripType = 'business') => 
    api.get(`/ai/recommendations/${destination}?tripType=${tripType}`),
  chatWithSpeech: (message, sessionId) => 
    api.post('/ai/chat/speech', { message, sessionId }),
  processWithTiny: (message, sessionId) => 
    api.post('/ai/process/tiny', { message, sessionId }),
  chat: (message, modelType, sessionId) => 
    api.post('/ai/chat', { message, modelType, sessionId }),
  analyzeFeedback: (feedback, tripId) => 
    api.post('/ai/analyze-feedback', { feedback, tripId }),
  generateExpenseReport: (tripData, expenses) => 
    api.post('/ai/expense-report', { tripData, expenses }),
  optimizeItinerary: (itinerary, feedback, constraints) => 
    api.post('/ai/optimize-itinerary', { itinerary, feedback, constraints }),
  health: () => api.get('/ai/health'),
};

// Trips API
export const tripsAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (tripData) => api.post('/trips', tripData),
  update: (id, tripData) => api.put(`/trips/${id}`, tripData),
  delete: (id) => api.delete(`/trips/${id}`),
  addFeedback: (id, feedback) => api.post(`/trips/${id}/feedback`, feedback),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

// Payments API
export const paymentsAPI = {
  createIntent: (paymentData) => api.post('/payments/create-intent', paymentData),
  getHistory: () => api.get('/payments/history'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api; 