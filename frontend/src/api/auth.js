import api, { getCsrfCookie } from './axios';

/**
 * Auth API — Login, Register, Logout, Get User
 *
 * Semua fungsi auth menggunakan Sanctum SPA authentication.
 * Flow: getCsrfCookie() → POST login/register → session cookie disimpan browser.
 */

/**
 * Login user.
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - { message, user }
 */
export const login = async (credentials) => {
  await getCsrfCookie();
  const response = await api.post('/login', credentials);
  return response.data;
};

/**
 * Register user baru (masyarakat).
 * @param {Object} data - { name, nik, email, phone, address, password, password_confirmation }
 * @returns {Promise<Object>} - { message, user }
 */
export const register = async (data) => {
  await getCsrfCookie();
  const response = await api.post('/register', data);
  return response.data;
};

/**
 * Logout user.
 */
export const logout = async () => {
  await api.post('/logout');
};

/**
 * Get profil user yang sedang login.
 * @returns {Promise<Object>} - { user }
 */
export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

/**
 * Update profil user.
 * @param {Object} data - { name, phone, address }
 * @returns {Promise<Object>}
 */
export const updateProfile = async (data) => {
  const response = await api.put('/user/profile', data);
  return response.data;
};
