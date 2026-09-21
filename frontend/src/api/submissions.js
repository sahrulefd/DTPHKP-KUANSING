import api from './axios';

/**
 * Track submission publicly by tracking number.
 */
export const trackSubmission = async (trackingNumber) => {
  const response = await api.get(`/track/${trackingNumber}`);
  return response.data;
};

/**
 * Get list of submissions (Masyarakat or Admin).
 */
export const getSubmissions = async (params = {}) => {
  const response = await api.get('/submissions', { params });
  return response.data;
};

/**
 * Get single submission detail.
 */
export const getSubmissionById = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};

/**
 * Create new submission (FormData with file uploads).
 */
export const createSubmission = async (formData) => {
  const response = await api.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Cancel submission (Masyarakat).
 */
export const cancelSubmission = async (id) => {
  const response = await api.delete(`/submissions/${id}/cancel`);
  return response.data;
};

/**
 * Submit rating & feedback for completed submission.
 */
export const rateSubmission = async (id, rating, feedback) => {
  const response = await api.post(`/submissions/${id}/rate`, {
    rating: parseInt(rating, 10),
    feedback: feedback || '',
  });
  return response.data;
};

/**
 * Verify document authenticity by tracking number (Public).
 */
export const verifyDocument = async (trackingNumber) => {
  const response = await api.get(`/verify/${trackingNumber}`);
  return response.data;
};
