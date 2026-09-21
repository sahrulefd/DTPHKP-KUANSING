import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyDocument } from '../../api/submissions';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate } from '../../utils/formatters';
import { DINAS_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function VerifyPage() {
  const { trackingNumber } = useParams();
  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchVerify();
  }, [trackingNumber]);

  const fetchVerify = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await verifyDocument(trackingNumber);
      setDocData(data.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Header Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <img src="/logo.png" alt="Logo Pemkab" className="h-5 w-auto object-contain" />
          <span>Verifikasi Keaslian Dokumen Resmi</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Portal Keaslian Dokumen DTPHKP</h1>
        <p className="text-sm text-slate-600">
          Sistem Verifikasi Keabsahan Surat &amp; Dokumen Pelayanan Publik {DINAS_NAME} {KABUPATEN_NAME}.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error || !docData ? (
        <div className="bg-white rounded-3xl p-8 border border-red-200 shadow-card text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 text-2xl font-bold">
            ✖
          </div>
          <h2 className="text-xl font-bold text-slate-900">Dokumen Tidak Ditemukan / Tidak Valid</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Nomor registrasi <strong>{trackingNumber}</strong> tidak terdaftar dalam database atau belum selesai diproses di sistem pelayanan resmi DTPHKP Kuansing.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 hover:underline pt-2">
            <img src="/back-icon.png" alt="Kembali" className="w-4 h-4 object-contain" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-elevated space-y-6">
          {/* Validity Banner */}
          {docData.is_valid ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 text-emerald-900">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-sm">
                ✓
              </div>
              <div>
                <h3 className="font-extrabold text-base text-emerald-950">DOKUMEN RESMI SAH &amp; TERDAFTAR</h3>
                <p className="text-xs text-emerald-800">
                  Surat hasil pelayanan ini diterbitkan secara elektronik oleh {DINAS_NAME} {KABUPATEN_NAME}.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 text-amber-900">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
                ⏳
              </div>
              <div>
                <h3 className="font-extrabold text-base text-amber-950">DOKUMEN DALAM PROSES VERIFIKASI</h3>
                <p className="text-xs text-amber-800">
                  Status permohonan saat ini: <strong>{docData.status.toUpperCase()}</strong>. Surat resmi belum dapat dipublikasikan.
                </p>
              </div>
            </div>
          )}

          {/* Details Table */}
          <div className="space-y-3 pt-2 text-xs font-sans">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">Detail Dokumen Terdaftar:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">Nomor Registrasi / Tracking</span>
                <span className="font-mono text-sm font-extrabold text-blue-900">{docData.tracking_number}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">Jenis Pelayanan Publik</span>
                <span className="font-bold text-slate-900">{docData.service_name}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">Nama Pemohon</span>
                <span className="font-bold text-slate-900">{docData.applicant_name}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">NIK Pemohon (Tersamarkan)</span>
                <span className="font-mono font-semibold text-slate-700">{docData.applicant_nik}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">Tanggal Disahkan</span>
                <span className="font-bold text-slate-900">{formatDate(docData.completed_at)}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-500 font-bold block text-[11px]">Pejabat / Verifikator</span>
                <span className="font-bold text-slate-900">{docData.verifier_name}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition inline-flex items-center gap-2"
            >
              <img src="/back-icon.png" alt="Kembali" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
              <span>Kembali ke Halaman Utama</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
