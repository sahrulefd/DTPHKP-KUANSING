import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authApi from '../api/auth';

/**
 * AuthContext — State Management untuk Autentikasi
 *
 * Menyediakan:
 * - user: data user yang sedang login (null jika belum login)
 * - loading: status loading saat cek auth
 * - isAuthenticated: boolean apakah user sudah login
 * - isAdmin: boolean apakah user adalah admin
 * - login: fungsi untuk login
 * - register: fungsi untuk register
 * - logout: fungsi untuk logout
 * - refreshUser: fungsi untuk refresh data user
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user saat pertama kali load (cek apakah sudah login)
  const fetchUser = useCallback(async () => {
    try {
      const data = await authApi.getUser();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Listen untuk event 401 dari axios interceptor
  useEffect(() => {
    const handleUnauthenticated = () => {
      setUser(null);
      // Hanya redirect ke login jika user saat ini sedang mengakses halaman terproteksi
      const pathname = window.location.pathname;
      if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('auth:unauthenticated', handleUnauthenticated);
    return () => {
      window.removeEventListener('auth:unauthenticated', handleUnauthenticated);
    };
  }, [navigate]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (formData) => {
    const data = await authApi.register(formData);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    navigate('/login', { replace: true });
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook untuk mengakses AuthContext.
 * @returns {Object} - { user, loading, isAuthenticated, isAdmin, login, register, logout, refreshUser }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}

export default AuthContext;
