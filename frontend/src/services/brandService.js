import { apiClient } from './authService';

export const getBrandProfile = async () => {
  const response = await apiClient.get('/api/brand');
  return response.data;
};

export const upsertBrandProfile = async (brandData) => {
  const response = await apiClient.put('/api/brand', brandData);
  return response.data;
};
