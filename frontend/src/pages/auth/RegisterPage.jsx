import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '../../components/common/Alert';
import { APP_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: '',
  });

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.nik.length !== 16) {
      setError('NIK harus tepat 16 digit.');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (!agreedTerms) {
      setError('Anda harus menyetujui ketentuan penggunaan layanan terlebih dahulu.');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) {
        const firstErrorKey = Object.keys(resp.errors)[0];
        setError(resp.errors[firstErrorKey][0]);
      } else {
        setError(resp?.message || 'Pendaftaran akun gagal. Silakan periksa formulir Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-blue-100 space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <img
            src="/logo.png"
            alt="Logo DTPHKP Kuansing"
            className="h-20 w-auto mx-auto object-contain hover:scale-105 transition transform"
          />
          <div>
            <h2 className="text-2xl font-black text-primary-950 tracking-tight">Pendaftaran Akun Masyarakat</h2>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mt-1">
              {APP_NAME} — {KABUPATEN_NAME}
            </p>
          </div>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama sesuai KTP"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">NIK (16 Digit) *</label>
              <input
                type="text"
                name="nik"
                maxLength={16}
                value={formData.nik}
                onChange={handleChange}
                placeholder="1409000000000000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Alamat Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nomor Telepon / WA *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="081234567890"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Alamat Lengkap *</label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              placeholder="Desa, Kecamatan, Kabupaten"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Kata Sandi *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Konfirmasi Sandi *</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Ulangi kata sandi"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900"
                required
              />
            </div>
          </div>

          {/* Checkbox Persetujuan Ketentuan Layanan */}
          <div className="flex items-start gap-2.5 pt-2 pb-1">
            <input
              type="checkbox"
              id="agree_terms"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
              required
            />
            <label htmlFor="agree_terms" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              Saya menyetujui <Link to="/panduan" target="_blank" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">ketentuan penggunaan layanan</Link> serta menyatakan bahwa data identitas yang dimasukkan adalah benar &amp; valid.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-soft hover:shadow-card transition duration-200 mt-3 flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mendaftarkan Akun...</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span>Daftar Akun Sekarang</span>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </span>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
            Masuk Di Sini
          </Link>
        </div>
      </div>
    </div>
  );
}
