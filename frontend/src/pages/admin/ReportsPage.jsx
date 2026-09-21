import { useState, useEffect } from 'react';
import { getReports } from '../../api/admin';
import { getServices } from '../../api/services';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminReportsPage() {
  // Submissions State
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchServicesList();
    fetchReportData();
  }, []);

  const fetchServicesList = async () => {
    try {
      const data = await getServices();
      setServices(data.data || []);
    } catch {
      // Handled
    }
  };

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const data = await getReports({
        start_date: startDate,
        end_date: endDate,
        service_id: serviceId,
        status: status,
      });
      setReports(data.data || []);
      setSummary(data.summary);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchReportData();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!reports || reports.length === 0) return;
    const headers = ['No. Resi', 'Nama Pemohon', 'NIK', 'Jenis Layanan', 'Tanggal Masuk', 'Status'];
    const rows = reports.map((r) => [
      `"${r.tracking_number || ''}"`,
      `"${r.applicant_name || ''}"`,
      `"${r.applicant_nik || ''}"`,
      `"${r.service_name || ''}"`,
      `"${r.created_at || ''}"`,
      `"${r.status || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Rekapitulasi_Pelayanan_DTPHKP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 print:shadow-none print:border-none print:p-0">
      
      {/* Printable Official Kop (Shown only when printing) */}
      <div className="hidden print:block border-b-4 border-double border-slate-900 pb-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <img src="/kop-logo.png" alt="Logo Pemkab Kuansing" className="h-20 w-auto object-contain" />
          <div className="text-center flex-1 space-y-0.5 font-serif">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 leading-tight">
              PEMERINTAH KABUPATEN KUANTAN SINGINGI
            </h3>
            <h2 className="font-black text-base uppercase tracking-wide text-slate-900 leading-tight">
              DINAS TANAMAN PANGAN, HORTIKULTURA<br />DAN KETAHANAN PANGAN
            </h2>
            <p className="text-[10px] font-sans text-slate-800 leading-tight pt-0.5">
              KOMPLEK PERKANTORAN PEMERINTAH DAERAH KABUPATEN KUANTAN SINGINGI - TELUK KUANTAN
            </p>
          </div>
          <div className="w-16"></div>
        </div>
        <h1 className="text-center font-bold text-base uppercase tracking-wide underline mt-4">
          LAPORAN REKAPITULASI PELAYANAN PUBLIK
        </h1>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Laporan & Rekapitulasi Pelayanan</h1>
          <p className="text-xs text-slate-500 mt-0.5">Kelola dan unduh rekapitulasi data permohonan pelayanan publik DTPHKP Kuansing</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Ekspor Excel (.CSV)</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" rx="1" />
            </svg>
            <span>Cetak PDF / Print</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Filter Bar (Hidden when printing) */}
        <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs print:hidden">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Jenis Layanan</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="">Semua Layanan</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Status Pengajuan</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="">Semua Status</option>
              <option value="menunggu_verifikasi">Menunggu Verifikasi</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="w-full py-2 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition cursor-pointer">
              Filter Data
            </button>
          </div>
        </form>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-center">
              <p className="text-slate-500 font-bold">Total Pengajuan</p>
              <p className="text-lg font-black text-slate-900">{summary.total}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <p className="text-amber-800 font-bold">Menunggu</p>
              <p className="text-lg font-black text-amber-900">{summary.menunggu_verifikasi}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <p className="text-blue-800 font-bold">Diproses</p>
              <p className="text-lg font-black text-blue-900">{summary.diproses}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-center">
              <p className="text-green-800 font-bold">Selesai</p>
              <p className="text-lg font-black text-green-900">{summary.selesai}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center col-span-2 sm:col-span-1">
              <p className="text-red-800 font-bold">Ditolak</p>
              <p className="text-lg font-black text-red-900">{summary.ditolak}</p>
            </div>
          </div>
        )}

        {/* Report Table */}
        {loading ? (
          <LoadingSpinner />
        ) : reports.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Tidak ada data untuk laporan ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-bold uppercase print:bg-slate-200 print:text-slate-900">
                <tr>
                  <th className="p-3 border print:border-slate-400">No. Resi</th>
                  <th className="p-3 border print:border-slate-400">Pemohon</th>
                  <th className="p-3 border print:border-slate-400">NIK</th>
                  <th className="p-3 border print:border-slate-400">Jenis Layanan</th>
                  <th className="p-3 border print:border-slate-400">Tanggal Masuk</th>
                  <th className="p-3 border print:border-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 border font-mono font-bold text-slate-800 print:border-slate-300">{r.tracking_number}</td>
                    <td className="p-3 border font-bold text-slate-900 print:border-slate-300">{r.applicant_name}</td>
                    <td className="p-3 border font-mono text-slate-600 print:border-slate-300">{r.applicant_nik}</td>
                    <td className="p-3 border text-slate-800 print:border-slate-300">{r.service_name}</td>
                    <td className="p-3 border text-slate-500 print:border-slate-300">{r.created_at}</td>
                    <td className="p-3 border print:border-slate-300"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Official Sign Off for Printable Report */}
      <div className="hidden print:flex justify-end pt-8 font-sans text-xs">
        <div className="text-center space-y-1 max-w-xs">
          <p>Teluk Kuantan, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="font-bold uppercase text-slate-900">
            KEPALA DINAS TANAMAN PANGAN,<br />HORTIKULTURA DAN KETAHANAN PANGAN
          </p>
          <div className="h-20 flex justify-center items-center">
            <img src="/ttd.png" alt="TTD Kadis" className="h-20 object-contain" />
          </div>
          <p className="font-bold text-slate-900 underline text-sm">Deflides Gusni, SP., M. Si</p>
          <p className="text-[11px] text-slate-800">Pembina Utama Muda / (IV/c)</p>
          <p className="text-[10px] font-mono text-slate-700">NIP. 19691231 200003 1 026</p>
        </div>
      </div>
    </div>
  );
}

