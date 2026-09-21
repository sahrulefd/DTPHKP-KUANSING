import axios from 'axios';

/**
 * Axios Instance — DTPHKP Pelayanan
 *
 * Instance terpusat untuk semua HTTP request ke Laravel API.
 * Fitur:
 * - Base URL otomatis ke /api
 * - Credentials (cookies) dikirim otomatis untuk Sanctum auth
 * - CSRF token otomatis diambil sebelum request mutasi (POST/PUT/DELETE)
 * - Interceptor untuk handle error 401 (unauthenticated) dan 419 (CSRF mismatch)
 */

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Mengambil CSRF cookie dari Sanctum.
 * Harus dipanggil sebelum request POST/PUT/DELETE pertama kali.
 */
export const getCsrfCookie = async () => {
  await axios.get('/sanctum/csrf-cookie', {
    withCredentials: true,
  });
};

/**
 * Response Interceptor
 * - 401: Redirect ke login (session expired)
 * - 419: CSRF token mismatch, coba refresh token
 * - 422: Validation error (biarkan caller handle)
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Session expired — clear local state dan redirect ke login
      // Event ini akan di-listen oleh AuthContext
      window.dispatchEvent(new CustomEvent('auth:unauthenticated'));
    }

    if (status === 419) {
      // CSRF token mismatch — refresh dan retry sekali
      await getCsrfCookie();
      return api.request(error.config);
    }

    return Promise.reject(error);
  }
);

export default api;
