import axios from 'axios';

const API_URL = 'http://localhost:5000/api/companies';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
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

// Company Service
const companyService = {
  // Get current user's company info
  getMyCompany: async () => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch company' };
    }
  },

  // List all users in company
  listUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Invite a new user to company
  inviteUser: async (userData) => {
    try {
      const response = await api.post('/invite', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to invite user' };
    }
  },

  // Promote user to company_admin
  promoteUser: async (userId) => {
    try {
      const response = await api.put(`/promote/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to promote user' };
    }
  },
};

export default companyService;
