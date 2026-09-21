import api from './axios';

export const getFaqs = async (category = '') => {
  const params = category ? { category } : {};
  const response = await api.get('/faqs', { params });
  return response.data;
};

export const getGuides = async () => {
  const response = await api.get('/guides');
  return response.data;
};

export const getGuideBySlug = async (slug) => {
  const response = await api.get(`/guides/${slug}`);
  return response.data;
};

export const getSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const submitPublicSurvey = async (data) => {
  const response = await api.post('/surveys', data);
  return response.data;
};
