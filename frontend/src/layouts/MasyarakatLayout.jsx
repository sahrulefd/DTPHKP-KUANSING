import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME } from '../utils/constants';

export default function MasyarakatLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Ajukan Layanan', path: '/dashboard/pengajuan/baru' },
    { name: 'Riwayat Pengajuan', path: '/dashboard/pengajuan' },
    { name: 'Profil Saya', path: '/dashboard/profil' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    if (path === '/dashboard/pengajuan') return location.pathname === '/dashboard/pengajuan';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Banner Alert Bar ala image.png / uir.ac.id */}
      <div className="bg-blue-900 text-white py-2 px-4 text-xs font-semibold flex items-center justify-between border-b border-blue-800">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          <span className="bg-blue-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider shrink-0">Pengumuman</span>
          <p className="truncate text-blue-100">
            Selamat Datang di Sistem Online Administrasi Dinas Tanaman Pangan, Hortikultura dan Perkebunan Kabupaten Kuantan Singingi — Memberikan pelayanan prima, cepat, dan transparan.
          </p>
        </div>
      </div>

      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo DTPHKP"
                className="h-11 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="font-black text-slate-900 text-base block leading-tight">{APP_NAME}</span>
                <span className="text-[10px] font-bold text-blue-600 block uppercase">Portal Administrasi Pelayanan</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user?.name}</p>
              <p className="text-xs font-mono text-slate-500">NIK: {user?.nik || '-'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200/80 sticky top-28 space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center shrink-0 shadow-soft">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black text-slate-900 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-soft'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
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
                  <span>Ke Halaman Utama</span>
                  <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
