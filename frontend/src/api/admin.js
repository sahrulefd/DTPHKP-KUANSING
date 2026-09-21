import api from './axios';

/**
 * Admin Dashboard Stats.
 */
export const getAdminStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

/**
 * Admin: Update submission status.
 */
export const updateSubmissionStatus = async (id, data) => {
  if (data instanceof FormData) {
    const response = await api.post(`/admin/submissions/${id}/status`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  const response = await api.put(`/admin/submissions/${id}/status`, data);
  return response.data;
};

/**
 * Admin: Toggle document verification.
 */
export const toggleDocumentVerification = async (submissionId, documentId, isVerified) => {
  const response = await api.put(`/admin/submissions/${submissionId}/documents/${documentId}/verify`, {
    is_verified: isVerified,
  });
  return response.data;
};

/**
 * Admin: Create Service.
 */
export const createService = async (data) => {
  const response = await api.post('/admin/services', data);
  return response.data;
};

/**
 * Admin: Update Service.
 */
export const updateService = async (id, data) => {
  const response = await api.put(`/admin/services/${id}`, data);
  return response.data;
};

/**
 * Admin: Delete Service.
 */
export const deleteService = async (id) => {
  const response = await api.delete(`/admin/services/${id}`);
  return response.data;
};

/**
 * Admin: Get Users list.
 */
export const getUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

/**
 * Admin: Reset User Password.
 */
export const resetUserPassword = async (userId, password, passwordConfirmation) => {
  const response = await api.put(`/admin/users/${userId}/reset-password`, {
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
};

/**
 * Admin: Get Reports.
 */
export const getReports = async (params = {}) => {
  const response = await api.get('/admin/reports', { params });
  return response.data;
};

/**
 * Admin: Get Public Survey SKM Results.
 */
export const getAdminSurveys = async (params = {}) => {
  const response = await api.get('/admin/surveys', { params });
  return response.data;
};

/**
 * Admin: Delete Public Survey Entry.
 */
export const deleteAdminSurvey = async (id) => {
  const response = await api.delete(`/admin/surveys/${id}`);
  return response.data;
};
