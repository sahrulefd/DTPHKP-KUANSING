import api from './axios';

/**
 * Fetch all active public services.
 */
export const getServices = async (search = '') => {
  const params = search ? { search } : {};
  const response = await api.get('/services', { params });
  return response.data;
};

/**
 * Fetch service detail by slug (including requirements and procedures).
 */
export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/services/${slug}`);
  return response.data;
};
