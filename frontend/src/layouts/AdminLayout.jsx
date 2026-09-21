import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../utils/constants';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard Admin', path: '/admin/dashboard' },
    { name: 'Kelola Pengajuan', path: '/admin/pengajuan' },
    { name: 'Kelola Layanan', path: '/admin/layanan' },
    { name: 'Kelola FAQ', path: '/admin/faq' },
    { name: 'Kelola Panduan', path: '/admin/panduan' },
    { name: 'Kelola Pengguna', path: '/admin/pengguna' },
    { name: 'Laporan', path: '/admin/laporan' },
    { name: 'Pengaturan Situs', path: '/admin/pengaturan' },
  ];

  const isActive = (path) => {
    if (path === '/admin/dashboard') return location.pathname === '/admin/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo DTPHKP" className="h-10 w-auto object-contain" />
              <span className="font-black text-white text-lg">{APP_NAME}</span>
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
              PANEL ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-300 hidden sm:inline">
              {user?.name} (Administrator)
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Admin Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200/80 sticky top-24">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
              Menu Pengelolaan
            </h4>
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive(item.path)
                      ? 'bg-slate-900 text-white shadow-soft'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to="/"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
                >
                  <span>Lihat Portal Publik</span>
                  <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="lg:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
