import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getServices, getServiceBySlug } from '../../api/services';
import { createSubmission } from '../../api/submissions';
import Alert from '../../components/common/Alert';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function NewSubmissionPage() {
  const [searchParams] = useSearchParams();
  const preSelectedServiceId = searchParams.get('service');
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // Step 1: Select Service, Step 2: Fill Form & Upload, Step 3: Preview

  const [notes, setNotes] = useState('');
  const [fileMap, setFileMap] = useState({}); // { [requirementId]: File }

  useEffect(() => {
    fetchServicesList();
  }, []);

  const fetchServicesList = async () => {
    try {
      const data = await getServices();
      setServices(data.data);

      if (preSelectedServiceId) {
        const found = data.data.find((s) => s.id === parseInt(preSelectedServiceId));
        if (found) {
          handleSelectService(found.slug);
        }
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleSelectService = async (slug) => {
    setLoading(true);
    try {
      const data = await getServiceBySlug(slug);
      setSelectedService(data.data);
      setStep(2);
    } catch {
      setError('Gagal memuat detail layanan.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (requirementId, file) => {
    setFileMap((prev) => ({
      ...prev,
      [requirementId]: file,
    }));
  };

  const validateStep2 = () => {
    if (!selectedService) return false;

    // Check required files
    for (const req of selectedService.requirements) {
      if (req.is_required && !fileMap[req.id]) {
        setError(`Dokumen "${req.name}" wajib diunggah.`);
        return false;
      }
    }

    setError('');
    setStep(3);
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('service_id', selectedService.id);
      if (notes) formData.append('notes', notes);

      let index = 0;
      Object.keys(fileMap).forEach((reqId) => {
        if (fileMap[reqId]) {
          formData.append(`documents[${index}][requirement_id]`, reqId);
          formData.append(`documents[${index}][file]`, fileMap[reqId]);
          index++;
        }
      });

      const res = await createSubmission(formData);
      navigate(`/dashboard/pengajuan/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim pengajuan. Pastikan semua file sesuai format dan ukuran < 5MB.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && step === 1) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-8">
      {/* Page Title */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Formulir Pengajuan Layanan</h1>
        <p className="text-xs text-slate-500 mt-1">Langkah {step} dari 3: {step === 1 ? 'Pilih Jenis Layanan' : step === 2 ? 'Lengkapi Dokumen' : 'Preview & Submit'}</p>
      </div>

      {/* Wizard Steps indicator */}
      <div className="grid grid-cols-3 gap-2">
        <div className={`h-2 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
        <div className={`h-2 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
        <div className={`h-2 rounded-full ${step >= 3 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800">Pilih Jenis Pelayanan Publik:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => handleSelectService(srv.slug)}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-primary-50 hover:border-primary-300 text-left transition flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-primary-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary-700">{srv.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{srv.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Fill Form & Upload Documents */}
      {step === 2 && selectedService && (
        <div className="space-y-6">
          <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-primary-700 uppercase">Layanan Terpilih</span>
              <h3 className="text-base font-bold text-slate-900">{selectedService.name}</h3>
            </div>
            <button
              onClick={() => { setStep(1); setSelectedService(null); }}
              className="text-xs font-semibold text-primary-700 hover:underline"
            >
              Ganti Layanan
            </button>
          </div>

          {/* Requirements Upload */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Unggah Dokumen Persyaratan:
            </h4>

            {selectedService.requirements?.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <label className="text-sm font-bold text-slate-900 block">
                      {req.name} {req.is_required ? <span className="text-red-500">*</span> : <span className="text-xs font-normal text-slate-400">(Opsional)</span>}
                    </label>
                    {req.description && <p className="text-xs text-slate-500">{req.description}</p>}
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                    Format: {req.file_type || 'PDF,JPG,PNG'} (Max 5MB)
                  </span>
                </div>

                <input
                  type="file"
                  accept={req.file_type ? req.file_type.split(',').map(t => '.' + t.trim()).join(',') : '.pdf,.jpg,.jpeg,.png'}
                  onChange={(e) => handleFileChange(req.id, e.target.files[0])}
                  className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700 cursor-pointer"
                />

                {fileMap[req.id] && (
                  <p className="text-xs text-green-700 font-medium">✓ File terpilih: {fileMap[req.id].name}</p>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Tambahan (Opsional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan catatan atau keterangan tambahan untuk petugas admin..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition inline-flex items-center gap-1.5"
            >
              <img src="/back-icon.png" alt="Kembali" className="w-3.5 h-3.5 object-contain inline-block" />
              <span>Kembali</span>
            </button>
            <button
              onClick={validateStep2}
              className="px-6 py-2.5 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-soft transition inline-flex items-center gap-1.5"
            >
              <span>Lanjut ke Preview</span>
              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Preview & Submit */}
      {step === 3 && selectedService && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">Ringkasan Pengajuan:</h4>
            <div className="text-xs space-y-1 text-slate-700">
              <p><strong>Layanan:</strong> {selectedService.name}</p>
              <p><strong>Estimasi Waktu:</strong> {selectedService.duration}</p>
              <p><strong>Biaya:</strong> {selectedService.cost}</p>
              {notes && <p><strong>Catatan:</strong> {notes}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-800">Dokumen Yang Akan Diunggah:</h4>
            <ul className="space-y-2 text-xs">
              {selectedService.requirements?.map((req) => (
                <li key={req.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>{req.name}</span>
                  <span className={fileMap[req.id] ? 'text-green-700 font-bold inline-flex items-center gap-1' : 'text-slate-400'}>
                    {fileMap[req.id] ? (
                      <>
                        <img src="/document-icon.png" alt="Dokumen" className="w-3.5 h-3.5 object-contain inline-block" />
                        <span>{fileMap[req.id].name}</span>
                      </>
                    ) : 'Belum diunggah'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition inline-flex items-center gap-1.5"
            >
              <img src="/back-icon.png" alt="Edit" className="w-3.5 h-3.5 object-contain inline-block" />
              <span>Edit Dokumen</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 text-sm font-extrabold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-card transition inline-flex items-center gap-2 cursor-pointer"
            >
              {submitting ? (
                'Mengirim Pengajuan...'
              ) : (
                <>
                  <img src="/submit-icon.png" alt="Submit" className="w-4 h-4 object-contain inline-block brightness-0 invert" />
                  <span>Submit Pengajuan Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
