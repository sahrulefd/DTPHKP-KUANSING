import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';
import { APP_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      const userRole = res.user.role;

      if (userRole === 'admin') {
        const target = (from && from.startsWith('/admin')) ? from : '/admin/dashboard';
        navigate(target, { replace: true });
      } else {
        const target = (from && !from.startsWith('/admin')) ? from : '/dashboard';
        navigate(target, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-blue-100 space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <img
            src="/logo.png"
            alt="Logo DTPHKP Kuansing"
            className="h-20 w-auto mx-auto object-contain hover:scale-105 transition transform"
          />
          <div>
            <h2 className="text-2xl font-black text-primary-950 tracking-tight">Portal Masuk Akun</h2>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mt-1">
              {APP_NAME} — {KABUPATEN_NAME}
            </p>
          </div>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Alamat Email Registered
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 bg-white transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Lupa Kata Sandi?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 bg-white transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-soft hover:shadow-card transition duration-200 mt-2 flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span>Masuk Portal Pelayanan</span>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </span>
            )}
          </button>
        </form>

        <div className="pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
          Belum memiliki akun pelayanan?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
            Daftar Akun Masyarakat Sekarang
          </Link>
        </div>
      </div>

      {/* Modal Instruksi Lupa Kata Sandi (Hubungi Admin) */}
      {showForgotPasswordModal && (
        <Modal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
          title="Lupa Kata Sandi Akun?"
        >
          <div className="space-y-4 pt-1">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-slate-800 text-xs leading-relaxed space-y-2">
              <p className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-900 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  <circle cx="12" cy="15" r="1.2" fill="currentColor" />
                  <path d="M12 16.2V18" strokeWidth="2" />
                </svg>
                <span>Prosedur Reset Kata Sandi Pengguna</span>
              </p>
              <p>
                Untuk alasan keamanan data pelayanan publik, reset kata sandi akun dilakukan secara langsung oleh <strong>Administrator Sistem DTPHKP Kabupaten Kuantan Singingi</strong>.
              </p>
              <p>
                Silakan hubungi Verifikator / Admin Dinas dengan melampirkan <strong>NIK (16 Digit), Nama Lengkap, dan Email Registered</strong> Anda:
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/6282379809018?text=Halo%20Admin%20DTPHKP%2C%20saya%20lupa%20kata%20sandi%20akun%20pelayanan%20saya.%20Mohon%20bantuan%20reset%20password."
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black transition flex items-center justify-between shadow-soft hover:shadow-card group"
              >
                <span className="flex items-center gap-2">
                  <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WA" className="w-5 h-5 object-contain" />
                  <span>Hubungi Admin via WhatsApp (0823-7980-9018)</span>
                </span>
                <span className="text-emerald-200 group-hover:translate-x-1 transition-transform">↗</span>
              </a>

              <a
                href="mailto:dtphkpkuansing@gmail.com?subject=Permohonan%20Reset%20Password%20Akun%20DTPHKP"
                className="w-full p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-between shadow-soft hover:shadow-card group"
              >
                <span className="flex items-center gap-2">
                  <img src="https://img.icons8.com/color/48/new-post.png" alt="Email" className="w-5 h-5 object-contain" />
                  <span>Email Resmi: dtphkpkuansing@gmail.com</span>
                </span>
                <span className="text-slate-400 group-hover:translate-x-1 transition-transform">✉</span>
              </a>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
              <svg className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1.5v2" />
                <path d="M17.5 4l-1.4 1.4" />
                <path d="M20.5 8.5l-1.9 0.7" />
                <path d="M21.5 13h-2" />
                <path d="M19 17.5l-1.4-1.4" />
                <path d="M6.5 4l1.4 1.4" />
                <path d="M3.5 8.5l1.9 0.7" />
                <path d="M2.5 13h2" />
                <path d="M5 17.5l1.4-1.4" />
                <path d="M8.5 15.5C7.2 14.5 6.5 13 6.5 11.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 5.5 5.5c0 1.5-.7 3-2 4" />
                <path d="M9.5 9a2.5 2.5 0 0 1 2.5-2.5" />
                <path d="M9 16.5h6" />
                <path d="M9.5 18.8h5" />
                <path d="M10 21h4" />
                <path d="M10.5 22.5c.8.6 2.2.6 3 0" />
              </svg>
              <span>Setelah Admin memverifikasi NIK &amp; identitas Anda, Admin akan mereset kata sandi Anda di Panel Admin dan memberikan kata sandi baru untuk Anda gunakan masuk.</span>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
