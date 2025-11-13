import { apiClient } from './authService';

export const generateCampaignImage = async (templateData, userData) => {
  const response = await apiClient.post('/api/images/generate', {
    templateData,
    userData
  });
  return response.data;
};
