import { apiClient } from './authService';

export const getTemplates = async (category = null) => {
  const params = category ? { category } : {};
  const response = await apiClient.get('/api/templates', { params });
  return response.data.templates || response.data;
};

export const getTemplate = async (id) => {
  const response = await apiClient.get(`/api/templates/${id}`);
  return response.data.template || response.data;
};
