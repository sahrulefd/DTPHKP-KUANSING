import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../api/admin';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-elevated">
        <h1 className="text-2xl font-extrabold">Dashboard Pengelolaan Administrasi</h1>
        <p className="text-xs text-slate-400 mt-1">Ringkasan permohonan masuk, antrean verifikasi, dan statistik pelayanan publik DTPHKP Kuansing.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-amber-700 uppercase">Menunggu Verifikasi</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.menunggu_verifikasi || 0}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-blue-700 uppercase">Sedang Diproses</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.diproses || 0}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-green-700 uppercase">Selesai</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.selesai || 0}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <p className="text-xs font-bold text-red-700 uppercase">Ditolak</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats?.ditolak || 0}</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Layanan Aktif</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.total_services || 0} Jenis Layanan</p>
          </div>
          <Link to="/admin/layanan" className="text-xs font-bold text-primary-600 hover:underline inline-flex items-center gap-1">
            <span>Kelola</span>
            <svg className="w-3.5 h-3.5 text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Pengguna Terdaftar</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.total_masyarakat || 0} Pemohon</p>
          </div>
          <Link to="/admin/pengguna" className="text-xs font-bold text-primary-600 hover:underline inline-flex items-center gap-1">
            <span>Kelola</span>
            <svg className="w-3.5 h-3.5 text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Recent Submissions Queue */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Antrean Pengajuan Terkini</h2>
          <Link to="/admin/pengajuan" className="text-xs font-bold text-primary-600 hover:underline inline-flex items-center gap-1">
            <span>Lihat Semua Antrean</span>
            <svg className="w-3.5 h-3.5 text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </Link>
        </div>

        <div className="space-y-3">
          {stats?.recent_submissions?.map((sub) => (
            <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary-700">{sub.tracking_number}</span>
                  <StatusBadge status={sub.status} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{sub.service?.name}</h4>
                <p className="text-xs text-slate-500">Pemohon: {sub.user?.name} (NIK: {sub.user?.nik}) • {formatDate(sub.created_at)}</p>
              </div>

              <Link
                to={`/admin/pengajuan/${sub.id}`}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition text-center shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Verifikasi & Process</span>
                <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
