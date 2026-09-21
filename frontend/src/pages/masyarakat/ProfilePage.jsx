import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from '../../api/auth';
import Alert from '../../components/common/Alert';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        nik: user.nik || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (formData.nik.length !== 16) {
      setErrorMsg('NIK harus tepat 16 digit.');
      setLoading(false);
      return;
    }

    try {
      await updateProfile(formData);
      await refreshUser();
      setSuccessMsg('Data profil Anda berhasil diperbarui dan disimpan.');
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) {
        const firstErrKey = Object.keys(resp.errors)[0];
        setErrorMsg(resp.errors[firstErrKey][0]);
      } else {
        setErrorMsg(resp?.message || 'Gagal menyimpan pembaruan profil.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-blue-100 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-black text-3xl flex items-center justify-center shadow-soft shrink-0">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-black text-slate-900">{user?.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
              {user?.role === 'admin' ? 'Administrator' : 'Masyarakat / Pemohon'}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
          <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-600">
            <span><strong>NIK:</strong> <span className="font-mono font-bold">{user?.nik || '-'}</span></span>
            <span><strong>No. WA:</strong> <span className="font-mono font-bold">{user?.phone || '-'}</span></span>
          </div>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-black text-slate-900">Edit Informasi Profil</h1>
          <p className="text-xs text-slate-500 mt-1">Perbarui data pribadi Anda yang terdaftar pada sistem DTPHKP Kuansing</p>
        </div>

        {successMsg && <Alert type="success" message={successMsg} onClose={() => setSuccessMsg('')} />}
        {errorMsg && <Alert type="error" message={errorMsg} onClose={() => setErrorMsg('')} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama sesuai KTP"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                NIK (16 Digit) *
              </label>
              <input
                type="text"
                name="nik"
                maxLength={16}
                value={formData.nik}
                onChange={handleChange}
                placeholder="1409000000000000"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 font-mono transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email (Tidak Dapat Diubah)
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500 cursor-not-allowed font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomor Telepon / WA *
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="081234567890"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Alamat Lengkap *
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Desa, Kecamatan, Kabupaten"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none text-sm text-slate-900 transition"
              required
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-soft hover:shadow-card transition duration-200 cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span>Simpan Perubahan Profil</span>
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
