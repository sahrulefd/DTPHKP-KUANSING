import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubmissions } from '../../api/submissions';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export default function MasyarakatDashboardPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const data = await getSubmissions({ per_page: 5 });
      setSubmissions(data.data || []);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const getCountByStatus = (status) => {
    return submissions.filter((s) => s.status === status).length;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 rounded-3xl p-8 text-white shadow-elevated relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo DTPHKP" className="h-10 w-auto object-contain" />
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-blue-100">
              Portal Masyarakat
            </span>
          </div>
          <h1 className="text-3xl font-black">{user?.name}</h1>
          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Kelola pengajuan surat administrasi, permohonan kelompok tani, pupuk, alsintan, dan pantau status riwayat berkas Anda secara terpusat.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/dashboard/pengajuan/baru"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-soft transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span>Buat Surat Baru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Menunggu</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{getCountByStatus('menunggu_verifikasi')}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Diproses</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{getCountByStatus('diproses')}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Ditolak</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{getCountByStatus('ditolak')}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Selesai</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{getCountByStatus('selesai')}</p>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-slate-900">Pengajuan Terbaru (Riwayat)</h2>
          <Link to="/dashboard/pengajuan" className="text-xs font-extrabold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
            <span>Buka Tabel Riwayat Lengkap</span>
            <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : submissions.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <p className="text-slate-500 text-xs">Anda belum memiliki pengajuan surat / layanan.</p>
            <Link
              to="/dashboard/pengajuan/baru"
              className="inline-block px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-soft"
            >
              Ajukan Layanan Pertama
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700">{sub.user?.nik || sub.tracking_number}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      sub.status === 'selesai' ? 'bg-emerald-100 text-emerald-800' :
                      sub.status === 'ditolak' ? 'bg-red-100 text-red-800' :
                      sub.status === 'diproses' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status === 'selesai' ? 'SELESAI' : sub.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900">{sub.service?.name}</h4>
                  <p className="text-xs text-slate-500">Waktu Upload: {formatDate(sub.created_at)}</p>
                </div>

                <Link
                  to={`/dashboard/pengajuan/${sub.id}`}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition text-center shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>Lihat Detail</span>
                  <svg className="w-3.5 h-3.5 text-slate-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
