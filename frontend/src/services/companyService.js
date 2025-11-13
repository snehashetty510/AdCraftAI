import { apiClient } from './authService';

// Company Service
const companyService = {
  // Get current user's company info
  getMyCompany: async () => {
    try {
      const response = await apiClient.get('/api/companies/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get company info' };
    }
  },

  // List all users in company
  listUsers: async () => {
    try {
      const response = await apiClient.get('/api/companies/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Invite a new user to company
  inviteUser: async (userData) => {
    try {
      const response = await apiClient.post('/api/companies/invite', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to invite user' };
    }
  },

  // Promote user to company_admin
  promoteUser: async (userId) => {
    try {
      const response = await apiClient.put(`/api/companies/promote/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to promote user' };
    }
  },
};

export default companyService;
