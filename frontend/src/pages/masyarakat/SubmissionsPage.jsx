import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubmissions, cancelSubmission } from '../../api/submissions';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';
import { formatDate } from '../../utils/formatters';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocSubmission, setSelectedDocSubmission] = useState(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ type: '', message: '' });
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getSubmissions({ status: statusFilter, per_page: 100 });
      setSubmissions(data.data || []);
    } catch {
      setAlertInfo({ type: 'error', message: 'Gagal memuat data pengajuan.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin membatalkan pengajuan surat ini?')) return;
    setCancellingId(id);
    try {
      await cancelSubmission(id);
      setAlertInfo({ type: 'success', message: 'Pengajuan surat berhasil dibatalkan.' });
      fetchSubmissions();
    } catch (err) {
      setAlertInfo({ type: 'error', message: err.response?.data?.message || 'Gagal membatalkan pengajuan.' });
    } finally {
      setCancellingId(null);
    }
  };

  const openDocModal = (sub) => {
    setSelectedDocSubmission(sub);
    setIsDocModalOpen(true);
  };

  // Helper compute Posisi
  const getPosisi = (status) => {
    switch (status) {
      case 'menunggu_verifikasi':
        return 'Staff Admin';
      case 'diproses':
        return 'Seksi Terkait';
      case 'selesai':
        return 'Selesai / Kepala Dinas';
      case 'ditolak':
        return 'Ditolak Verifikator';
      default:
        return 'Staff Admin';
    }
  };

  // Helper compute Durasi
  const getDurasi = (sub) => {
    if (sub.status === 'ditolak') return 'Pengajuan Ditolak';
    if (sub.status === 'selesai') return 'Selesai / Instant';
    return sub.service?.duration || '1 - 3 Hari Kerja';
  };

  // Filter & Search Logic
  const filteredData = submissions.filter((sub) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const serviceName = sub.service?.name?.toLowerCase() || '';
    const trackingNum = sub.tracking_number?.toLowerCase() || '';
    const userNik = sub.user?.nik?.toLowerCase() || '';
    return serviceName.includes(term) || trackingNum.includes(term) || userNik.includes(term);
  });

  // Pagination
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert Bar ala image.png */}
      <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-sm space-y-1">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-white shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="11" x2="12" y2="16.5" />
            <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <div>
            <p className="font-bold text-sm">
              Selamat Datang di Sistem Online Administrasi Dinas Tanaman Pangan, Hortikultura dan Perkebunan (DTPHKP) Kabupaten Kuantan Singingi
            </p>
            <p className="text-xs text-emerald-100 italic mt-0.5">
              "Menjadi Dinas Terdepan, Akuntabel dan Melayani Masyarakat" — Himbauan kepada pemohon yang menggunakan pelayanan agar memasukkan no WA yang aktif dan benar.
            </p>
          </div>
        </div>
      </div>

      {alertInfo.message && (
        <Alert type={alertInfo.type} message={alertInfo.message} onClose={() => setAlertInfo({ type: '', message: '' })} />
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/dashboard/pengajuan/baru"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-soft hover:shadow-card transition flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Buat Surat Baru</span>
        </Link>
      </div>

      {/* Main Table Container ala image.png */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
        {/* Controls Bar: Entries Dropdown & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 rounded-lg border border-slate-300 bg-white font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="font-bold">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari kata kunci..."
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <LoadingSpinner />
        ) : paginatedData.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            Tidak ada data pengajuan surat / permohonan yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 text-center w-10">No</th>
                  <th className="py-3 px-3">NIK / Identitas</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Whatsapp</th>
                  <th className="py-3 px-3">Keperluan</th>
                  <th className="py-3 px-3">Waktu Upload</th>
                  <th className="py-3 px-3">Durasi / Lama Proses</th>
                  <th className="py-3 px-3 text-center">Berkas</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3">Posisi</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {paginatedData.map((sub, index) => {
                  const num = startIndex + index + 1;
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-3 text-center font-bold text-slate-500">{num}</td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-900">{sub.user?.nik || '-'}</td>
                      <td className="py-3.5 px-3 font-medium text-slate-700">{sub.user?.email || '-'}</td>
                      <td className="py-3.5 px-3 font-mono text-slate-700">{sub.user?.phone || '-'}</td>
                      <td className="py-3.5 px-3 max-w-xs">
                        <Link to={`/dashboard/pengajuan/${sub.id}`} className="font-bold text-blue-700 hover:text-blue-900 underline block uppercase">
                          {sub.service?.name}
                        </Link>
                        <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{sub.tracking_number}</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {formatDate(sub.created_at)}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-700">{getDurasi(sub)}</td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => openDocModal(sub)}
                          className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded border border-emerald-300 transition text-[11px] cursor-pointer"
                        >
                          OK
                        </button>
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        {sub.status === 'selesai' && (
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded text-[11px]">
                            Selesai
                          </span>
                        )}
                        {sub.status === 'ditolak' && (
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 border border-red-300 font-bold rounded text-[11px]">
                            Ditolak
                          </span>
                        )}
                        {sub.status === 'diproses' && (
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 font-bold rounded text-[11px]">
                            Diproses
                          </span>
                        )}
                        {sub.status === 'menunggu_verifikasi' && (
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 font-bold rounded text-[11px]">
                            Menunggu Verifikasi
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-700 whitespace-nowrap">
                        {getPosisi(sub.status)}
                      </td>
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <Link
                            to={`/dashboard/pengajuan/${sub.id}`}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded text-[11px] transition shadow-2xs inline-flex items-center gap-1"
                          >
                            <span>Detail</span>
                          </Link>

                          {sub.status === 'selesai' && sub.output_letter_url && (
                            <a
                              href={sub.output_letter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px] transition shadow-2xs flex items-center gap-1 cursor-pointer"
                            >
                              <span>Unduh Surat</span>
                            </a>
                          )}

                          {sub.status === 'menunggu_verifikasi' && (
                            <button
                              onClick={() => handleCancel(sub.id)}
                              disabled={cancellingId === sub.id}
                              className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 font-bold rounded border border-red-400 text-[11px] transition cursor-pointer"
                            >
                              {cancellingId === sub.id ? '...' : 'Batalkan'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 pt-4 border-t border-slate-100">
          <div>
            Showing {totalEntries === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 font-medium hover:bg-slate-50 transition"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50 font-medium hover:bg-slate-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal Berkas Upload */}
      <Modal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        title={`Berkas Lampiran — ${selectedDocSubmission?.tracking_number || ''}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Daftar dokumen persyaratan yang diunggah untuk permohonan <strong>{selectedDocSubmission?.service?.name}</strong>:
          </p>

          {selectedDocSubmission?.documents && selectedDocSubmission.documents.length > 0 ? (
            <div className="space-y-2">
              {selectedDocSubmission.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{doc.requirement_name}</p>
                    <p className="text-slate-500 font-mono text-[11px] truncate max-w-xs">{doc.file_name}</p>
                  </div>
                  <a
                    href={doc.file_path}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition shrink-0 inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <img src="/view-icon.png" alt="Dokumen" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                    <span>Unduh / Lihat File</span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
              Belum ada berkas terlampir untuk pengajuan ini.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
