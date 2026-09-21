import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubmissionById } from '../../api/submissions';
import { getSettings } from '../../api/public';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import { formatDate, formatDateTime, formatFileSize } from '../../utils/formatters';

export default function SubmissionDetailPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const [data, settingsRes] = await Promise.all([
        getSubmissionById(id),
        getSettings().catch(() => ({ data: {} }))
      ]);
      setSubmission(data.data);
      if (settingsRes?.data) {
        setSettings(settingsRes.data);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!submission) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
        <p className="text-slate-600">Pengajuan tidak ditemukan.</p>
        <Link to="/dashboard/pengajuan" className="text-primary-600 font-bold mt-4 inline-flex items-center gap-1.5">
          <img src="/back-icon.png" alt="Kembali" className="w-4 h-4 object-contain inline-block" />
          <span>Kembali ke Riwayat</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary-700">{submission.tracking_number}</span>
              <StatusBadge status={submission.status} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{submission.service?.name}</h1>
            <p className="text-xs text-slate-500 mt-1">Diajukan pada: {formatDateTime(submission.created_at)}</p>
          </div>

          <div className="flex items-center gap-3">
            {submission.status === 'selesai' && submission.output_letter_url && (
              <a
                href={submission.output_letter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Unduh Surat Resmi</span>
              </a>
            )}
            <Link
              to="/dashboard/pengajuan"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition text-center shrink-0 inline-flex items-center gap-1.5"
            >
              <img src="/back-icon.png" alt="Kembali" className="w-3.5 h-3.5 object-contain inline-block" />
              <span>Kembali ke Daftar</span>
            </Link>
          </div>
        </div>

        {/* Banner Surat Resmi Hasil Pelayanan */}
        {submission.status === 'selesai' && (
          <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl text-white space-y-3 shadow-card border border-emerald-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <img src="/document-icon.png" alt="Dokumen" className="w-5 h-5 object-contain inline-block bg-white p-0.5 rounded-md shrink-0" />
                  <span>Surat Resmi Hasil Pelayanan Publik</span>
                </h3>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {submission.output_letter_url
                    ? 'Dokumen resmi hasil pelayanan ini telah ditandatangani oleh Kepala Dinas TPHKP Kuansing dan siap diunduh.'
                    : 'Pengajuan Anda telah selesai disetujui. File surat resmi bertanda tangan Kepala Dinas sedang diarsipkan oleh petugas dan akan tampil di sini.'}
                </p>
              </div>

              {submission.output_letter_url && (
                <a
                  href={submission.output_letter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition shrink-0 inline-flex items-center gap-2 shadow-soft"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Unduh Surat Resmi (PDF/File)</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Banner Link Survei SKM (Khusus status selesai) */}
        {submission.status === 'selesai' && (
          <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white space-y-4 shadow-elevated border border-blue-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <img src="/star-icon.png" alt="Star Icon" className="w-5 h-5 object-contain inline-block shrink-0" />
                  <span>Penilaian Kepuasan Pelayanan (Survei SKM)</span>
                </h3>
                <p className="text-xs text-blue-200 leading-relaxed max-w-xl">
                  Terima kasih! Pengajuan Anda telah selesai diproses. Berikan penilaian dan ulasan pengalaman Anda melalui Formulir Survei Kepuasan Masyarakat (SKM) KemenPAN-RB.
                </p>
              </div>
              <a
                href={settings.survey_url || 'https://skm.go.id/share/instansi/d1bd6598-706b-4c79-9e8c-0463a3834be0/1'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all duration-300 shrink-0 hover:scale-105"
              >
                <span>Isi Survei SKM (SKM.GO.ID) ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Rejection Banner */}
        {submission.status === 'ditolak' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-1">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
              <img src="/reject-icon.png" alt="Tolak" className="w-4 h-4 object-contain inline-block" />
              <span>Pengajuan Ditolak oleh Admin</span>
            </h4>
            <p><strong>Alasan Penolakan:</strong> {submission.rejection_reason || 'Persyaratan tidak sesuai/lengkap.'}</p>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <p className="text-slate-500 font-bold">Catatan Pengaju:</p>
            <p className="text-slate-800">{submission.notes || '-'}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <p className="text-slate-500 font-bold">Catatan Petugas Admin:</p>
            <p className="text-slate-800">{submission.admin_notes || '-'}</p>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <img src="/document-icon.png" alt="Dokumen" className="w-5 h-5 object-contain inline-block" /> Dokumen Persyaratan Yang Diunggah
        </h3>

        <div className="space-y-3">
          {submission.documents?.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">{doc.requirement_name || 'Dokumen'}</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{doc.file_name} ({formatFileSize(doc.file_size)})</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${doc.is_verified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {doc.is_verified ? '✓ Terverifikasi' : 'Belum Dibatasi'}
                </span>
                <a
                  href={doc.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <img src="/view-icon.png" alt="Dokumen" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                  <span>Unduh / Lihat File</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Status History */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 16 15" />
          </svg>
          <span>Riwayat Perubahan Status (Timeline Audit Trail)</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 py-2">
          {submission.status_histories?.map((history) => (
            <div key={history.id} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-xs"></div>
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={history.new_status} />
                  <span className="text-xs text-slate-400 font-mono">{formatDateTime(history.created_at)}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-1">{history.notes || 'Status diperbarui'}</p>
                <p className="text-[10px] text-slate-400">Oleh: {history.changed_by?.name || 'Sistem'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
