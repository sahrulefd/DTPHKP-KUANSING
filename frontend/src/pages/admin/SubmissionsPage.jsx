import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubmissions } from '../../api/submissions';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter, search]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getSubmissions({ status: statusFilter, search });
      setSubmissions(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const filterTabs = [
    { label: 'Semua', value: '' },
    { label: 'Menunggu Verifikasi', value: 'menunggu_verifikasi' },
    { label: 'Diproses', value: 'diproses' },
    { label: 'Ditolak', value: 'ditolak' },
    { label: 'Selesai', value: 'selesai' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Kelola Pengajuan Layanan</h1>
        <p className="text-xs text-slate-500 mt-0.5">Daftar permohonan masuk dari seluruh masyarakat & kelompok tani</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === tab.value
                  ? 'bg-slate-900 text-white shadow-soft'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari NIK, Nama Pemohon, atau Nomor Resi..."
          className="px-4 py-2 text-xs rounded-xl border border-slate-300 w-full sm:w-64 focus:ring-2 focus:ring-slate-800 focus:outline-none"
        />
      </div>

      {/* Submissions List Table */}
      {loading ? (
        <LoadingSpinner />
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">Tidak ada pengajuan ditemukan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Nomor Resi</th>
                <th className="p-3">Pemohon (NIK)</th>
                <th className="p-3">Jenis Layanan</th>
                <th className="p-3">Tanggal Masuk</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold">
                    <Link to={`/admin/pengajuan/${sub.id}`} className="text-primary-700 hover:text-primary-900 underline">
                      {sub.tracking_number}
                    </Link>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    <Link to={`/admin/pengajuan/${sub.id}`} className="hover:underline">
                      {sub.user?.name}
                    </Link>
                    <span className="block text-[10px] font-normal text-slate-500">NIK: {sub.user?.nik}</span>
                  </td>
                  <td className="p-3 text-slate-800 font-medium">{sub.service?.name}</td>
                  <td className="p-3 text-slate-500">{formatDate(sub.created_at)}</td>
                  <td className="p-3"><StatusBadge status={sub.status} /></td>
                  <td className="p-3 text-right">
                    <Link
                      to={`/admin/pengajuan/${sub.id}`}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg transition inline-flex items-center gap-1"
                    >
                      <span>Buka & Verifikasi</span>
                      <svg className="w-3 h-3 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9.5" />
                        <path d="M12 8l4 4-4 4M8 12h8" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
