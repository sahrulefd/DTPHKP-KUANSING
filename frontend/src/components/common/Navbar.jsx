import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { APP_NAME, DINAS_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Daftar Layanan', path: '/layanan' },
    { name: 'Panduan', path: '/panduan' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Survei SKM', path: '/survei' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      {/* Top mini banner ala uir.ac.id */}
      <div className="bg-primary-950 text-white text-xs py-1.5 px-4 border-b border-primary-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Official Portal</span>
            <span className="truncate font-medium">{DINAS_NAME} — {KABUPATEN_NAME}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-blue-200 text-[11px]">
            <span className="flex items-center gap-1.5">
              <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
              <span>Telepon: 0823-7980-9018</span>
            </span>
            <span className="flex items-center gap-1.5">
              <img src="https://img.icons8.com/color/48/new-post.png" alt="Email" className="w-3.5 h-3.5 object-contain" />
              <span>dtphkpkuansing@gmail.com</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Logo DTPHKP Kuansing"
              className="h-12 w-auto object-contain group-hover:scale-105 transition transform"
            />
            <div>
              <span className="font-black text-lg text-primary-950 block leading-tight tracking-tight group-hover:text-primary-600 transition">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-bold text-primary-600 block uppercase tracking-widest">
                DTPHKP KABUPATEN KUANTAN SINGINGI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-700 bg-primary-50 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-100/80 hover:scale-105'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons (Login / Register / Dashboard) */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl text-white bg-blue-600 hover:bg-blue-500 shadow-soft hover:shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all duration-200 hover-shine-effect"
                >
                  <span>{isAdmin ? 'Dashboard Admin' : (user?.name || 'Dashboard')}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-soft hover:shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all duration-200 hover-shine-effect"
                >
                  Daftar Akun
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 animate-slide-down">
            <div className="flex flex-col gap-1 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'text-blue-700 bg-blue-50 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 text-xs font-bold rounded-xl text-white bg-blue-600"
                  >
                    {isAdmin ? 'Dashboard Admin' : (user?.name || 'Dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-xl"
                  >
                    Daftar Akun
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
