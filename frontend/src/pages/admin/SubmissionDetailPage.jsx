import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubmissionById } from '../../api/submissions';
import { updateSubmissionStatus, toggleDocumentVerification } from '../../api/admin';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import Modal from '../../components/common/Modal';
import { formatDateTime, formatFileSize } from '../../utils/formatters';

export default function AdminSubmissionDetailPage() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Status Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [outputLetterFile, setOutputLetterFile] = useState(null);

  // Preview file modal
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const data = await getSubmissionById(id);
      setSubmission(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChecklist = async (docId, currentVerified) => {
    try {
      await toggleDocumentVerification(submission.id, docId, !currentVerified);
      fetchDetail();
    } catch {
      setAlert({ type: 'error', message: 'Gagal memperbarui status checklist dokumen.' });
    }
  };

  const openStatusModal = (status) => {
    setTargetStatus(status);
    setAdminNotes(submission.admin_notes || '');
    setRejectionReason(submission.rejection_reason || '');
    setOutputLetterFile(null);
    setModalOpen(true);
  };

  const handleConfirmStatusChange = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setAlert(null);

    try {
      const formData = new FormData();
      formData.append('status', targetStatus);
      if (adminNotes) formData.append('admin_notes', adminNotes);
      if (targetStatus === 'ditolak' && rejectionReason) {
        formData.append('rejection_reason', rejectionReason);
      }
      if (outputLetterFile) {
        formData.append('output_letter_file', outputLetterFile);
      }

      await updateSubmissionStatus(submission.id, formData);

      setModalOpen(false);
      setOutputLetterFile(null);
      setAlert({ type: 'success', message: `Status berhasil diubah menjadi ${targetStatus.replace('_', ' ').toUpperCase()}` });
      fetchDetail();
    } catch (err) {
      setAlert({ type: 'error', message: err.response?.data?.message || 'Gagal mengubah status.' });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!submission) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
        <p className="text-slate-600">Pengajuan tidak ditemukan.</p>
        <Link to="/admin/pengajuan" className="text-primary-600 font-bold mt-4 inline-flex items-center gap-1.5">
          <img src="/back-icon.png" alt="Kembali" className="w-4 h-4 object-contain inline-block" />
          <span>Kembali ke Antrean</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Header Info Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-primary-700">{submission.tracking_number}</span>
              <StatusBadge status={submission.status} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">{submission.service?.name}</h1>
            <p className="text-xs text-slate-500 mt-1">Pemohon: <strong>{submission.user?.name}</strong> (NIK: {submission.user?.nik}) • Email: {submission.user?.email} • HP: {submission.user?.phone}</p>
          </div>

          <Link
            to="/admin/pengajuan"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition text-center shrink-0 inline-flex items-center gap-1.5"
          >
            <img src="/back-icon.png" alt="Kembali" className="w-3.5 h-3.5 object-contain inline-block" />
            <span>Kembali ke Antrean</span>
          </Link>
        </div>

        {/* Action Controls for Admin */}
        <div className="p-4 bg-slate-900 rounded-2xl text-white flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Aksi Pemrosesan Admin:</span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openStatusModal('diproses')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <img src="/process-icon.png" alt="Proses" className="w-4 h-4 object-contain brightness-0 invert" />
              <span>Set Diproses</span>
            </button>

            <button
              onClick={() => openStatusModal('ditolak')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <img src="/reject-icon.png" alt="Tolak" className="w-4 h-4 object-contain" />
              <span>Tolak Pengajuan</span>
            </button>

            <button
              onClick={() => openStatusModal('selesai')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <img src="/complete-icon.png" alt="Selesai" className="w-4 h-4 object-contain" />
              <span>Set Selesai / Upload Surat</span>
            </button>
          </div>
        </div>

        {/* Surat Resmi Hasil Pelayanan (Jika sudah diunggah oleh admin) */}
        {submission.output_letter_url && (
          <div className="p-5 bg-emerald-900/10 border border-emerald-300 rounded-2xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>Dokumen Surat Resmi Pelayanan (TTD Kadis)</span>
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Surat hasil resmi yang telah ditandatangani Kepala Dinas dan diterbitkan untuk pemohon.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={submission.output_letter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5 shadow-xs"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Unduh / Lihat Surat</span>
                </a>
                <button
                  onClick={() => openStatusModal('selesai')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Ganti File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Banner */}
        {submission.status === 'ditolak' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-1">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
              <img src="/reject-icon.png" alt="Tolak" className="w-4 h-4 object-contain inline-block" />
              <span>Pengajuan Ditolak</span>
            </h4>
            <p><strong>Alasan Penolakan:</strong> {submission.rejection_reason || '-'}</p>
          </div>
        )}
      </div>

      {/* Document Review Checklist & Preview */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <circle cx="8.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
            <line x1="11" y1="12" x2="16.5" y2="12" />
            <circle cx="8.5" cy="15.5" r="0.75" fill="currentColor" stroke="none" />
            <line x1="11" y1="15.5" x2="16.5" y2="15.5" />
            <circle cx="8.5" cy="19" r="0.75" fill="currentColor" stroke="none" />
            <line x1="11" y1="19" x2="16.5" y2="19" />
          </svg>
          <span>Verifikasi Dokumen & File Checklist</span>
        </h3>

        <div className="space-y-3">
          {submission.documents?.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={doc.is_verified}
                  onChange={() => handleToggleChecklist(doc.id, doc.is_verified)}
                  className="w-5 h-5 accent-green-600 cursor-pointer rounded"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{doc.requirement_name || 'Dokumen'}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{doc.file_name} ({formatFileSize(doc.file_size)})</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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

      {/* Status History Timeline */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 16 15" />
          </svg>
          <span>Audit Trail Riwayat Status</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 py-2">
          {submission.status_histories?.map((history) => (
            <div key={history.id}>
              <div className="flex items-center gap-2">
                <StatusBadge status={history.new_status} />
                <span className="text-xs text-slate-400 font-mono">{formatDateTime(history.created_at)}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1">{history.notes || 'Status diubah'}</p>
              <p className="text-[10px] text-slate-400">Oleh: {history.changed_by?.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Change Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Ubah Status Ke: ${targetStatus.toUpperCase()}`}>
        <form onSubmit={handleConfirmStatusChange} className="space-y-4 text-xs">
          {targetStatus === 'ditolak' && (
            <div>
              <label className="block font-bold uppercase mb-1 text-red-700">Alasan Penolakan (Wajib Ditampilkan Ke Pemohon) *</label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Tuliskan secara spesifik mengapa pengajuan ini ditolak (misal: Scan KTP tidak terbaca, Berkas kurang)..."
                className="w-full p-3 rounded-xl border border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              ></textarea>
            </div>
          )}

          {targetStatus === 'selesai' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <label className="block font-bold uppercase text-emerald-900">
                Unggah Dokumen Surat Resmi (Bertanda Tangan Kadis)
              </label>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                Unggah file surat hasil / rekomendasi resmi yang telah ditandatangani manual oleh Kepala Dinas dan distempel basah (PDF / Gambar / Doc, Maks 10MB).
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setOutputLetterFile(e.target.files[0] || null)}
                className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
              {submission.output_letter_url && !outputLetterFile && (
                <p className="text-[10px] text-emerald-800 font-medium">
                  ✓ Sudah ada surat diunggah sebelumnya. Unggah file baru jika ingin mengganti.
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block font-bold uppercase mb-1 text-slate-700">Catatan Internal Admin (Opsional)</label>
            <textarea
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Catatan internal dinas..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-800 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-soft"
            >
              {actionLoading ? 'Menyimpan...' : 'Konfirmasi Simpan Status'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Document Preview Modal */}
      <Modal isOpen={!!previewFile} onClose={() => setPreviewFile(null)} title={`Preview: ${previewFile?.file_name}`}>
        <div className="space-y-4 text-xs">
          <p><strong>Persyaratan:</strong> {previewFile?.requirement_name}</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden min-h-[300px] max-h-[500px] flex items-center justify-center bg-slate-100">
            {previewFile?.file_type?.includes('image') ? (
              <img src={previewFile.file_path} alt="Preview" className="max-w-full max-h-[450px] object-contain" />
            ) : (
              <iframe title="Document Preview" src={previewFile?.file_path} className="w-full h-[450px] border-0"></iframe>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
