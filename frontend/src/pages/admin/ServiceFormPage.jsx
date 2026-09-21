import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createService, updateService } from '../../api/admin';
import { getServiceBySlug, getServices } from '../../api/services';
import Alert from '../../components/common/Alert';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ServiceFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    cost: 'Gratis / Tidak dipungut biaya',
    product: '',
    complaint_handling: 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau email: dtphkpkuansing@gmail.com',
    legal_basis: '',
    icon: 'UserGroupIcon',
    is_active: true,
    sort_order: 1,
    requirements: [
      { name: '', description: '', is_required: true, file_type: 'pdf' }
    ],
    procedures: [
      { step_number: 1, title: '', description: '' }
    ],
  });

  useEffect(() => {
    if (isEdit) fetchServiceData();
  }, [id]);

  const fetchServiceData = async () => {
    try {
      const allServicesData = await getServices();
      const found = allServicesData.data.find(s => s.id === parseInt(id));
      if (found) {
        const detail = await getServiceBySlug(found.slug);
        const s = detail.data;
        setFormData({
          name: s.name,
          description: s.description,
          duration: s.duration,
          cost: s.cost,
          product: s.product,
          complaint_handling: s.complaint_handling,
          legal_basis: s.legal_basis,
          icon: s.icon || 'UserGroupIcon',
          is_active: s.is_active,
          sort_order: s.sort_order,
          requirements: s.requirements.length ? s.requirements : [{ name: '', description: '', is_required: true, file_type: 'pdf' }],
          procedures: s.procedures.length ? s.procedures : [{ step_number: 1, title: '', description: '' }],
        });
      }
    } catch {
      setError('Gagal memuat data layanan.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementChange = (index, field, value) => {
    const updated = [...formData.requirements];
    updated[index][field] = value;
    setFormData({ ...formData, requirements: updated });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, { name: '', description: '', is_required: true, file_type: 'pdf' }]
    });
  };

  const removeRequirement = (index) => {
    const updated = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: updated });
  };

  const handleProcedureChange = (index, field, value) => {
    const updated = [...formData.procedures];
    updated[index][field] = value;
    setFormData({ ...formData, procedures: updated });
  };

  const addProcedure = () => {
    setFormData({
      ...formData,
      procedures: [...formData.procedures, { step_number: formData.procedures.length + 1, title: '', description: '' }]
    });
  };

  const removeProcedure = (index) => {
    const updated = formData.procedures.filter((_, i) => i !== index).map((p, idx) => ({ ...p, step_number: idx + 1 }));
    setFormData({ ...formData, procedures: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (isEdit) {
        await updateService(id, formData);
      } else {
        await createService(formData);
      }
      navigate('/admin/layanan');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan data layanan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{isEdit ? 'Edit Layanan Publik' : 'Tambah Layanan Baru'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Kelola formulir detail, persyaratan, dan langkah prosedur layanan</p>
        </div>
        <Link to="/admin/layanan" className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl inline-flex items-center gap-1.5">
          <img src="/back-icon.png" alt="Kembali" className="w-3.5 h-3.5 object-contain inline-block" />
          <span>Batal</span>
        </Link>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Main Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Nama Layanan *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Jangka Waktu *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2 Hari Kerja"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Biaya *</label>
              <input
                type="text"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Deskripsi Layanan *</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase mb-1">Produk Pelayanan *</label>
          <input
            type="text"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Dasar Hukum *</label>
            <textarea
              rows={2}
              value={formData.legal_basis}
              onChange={(e) => setFormData({ ...formData, legal_basis: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Penanganan Pengaduan *</label>
            <textarea
              rows={2}
              value={formData.complaint_handling}
              onChange={(e) => setFormData({ ...formData, complaint_handling: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
              required
            ></textarea>
          </div>
        </div>

        {/* Requirements Builder */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 uppercase">Persyaratan Dokumen</h4>
            <button type="button" onClick={addRequirement} className="px-3 py-1 bg-slate-900 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span>Tambah Persyaratan</span>
            </button>
          </div>

          {formData.requirements.map((req, idx) => (
            <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
              <input
                type="text"
                placeholder="Nama Persyaratan (misal: Fotocopy KTP)"
                value={req.name}
                onChange={(e) => handleRequirementChange(idx, 'name', e.target.value)}
                className="p-2 rounded-lg border border-slate-300 sm:col-span-2"
                required
              />
              <select
                value={req.file_type}
                onChange={(e) => handleRequirementChange(idx, 'file_type', e.target.value)}
                className="p-2 rounded-lg border border-slate-300"
              >
                <option value="pdf">PDF</option>
                <option value="pdf,jpg,png">PDF, JPG, PNG</option>
                <option value="jpg,png">JPG, PNG (Gambar)</option>
              </select>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-1 font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={req.is_required}
                    onChange={(e) => handleRequirementChange(idx, 'is_required', e.target.checked)}
                  />
                  Wajib
                </label>
                {formData.requirements.length > 1 && (
                  <button type="button" onClick={() => removeRequirement(idx)} className="text-red-600 font-bold text-base">✕</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Procedures Builder */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 uppercase">Langkah Prosedur</h4>
            <button type="button" onClick={addProcedure} className="px-3 py-1 bg-slate-900 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <span>Tambah Langkah</span>
            </button>
          </div>

          {formData.procedures.map((proc, idx) => (
            <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-700">Langkah {proc.step_number}</span>
                {formData.procedures.length > 1 && (
                  <button type="button" onClick={() => removeProcedure(idx)} className="text-red-600 font-bold">✕ Hapus Langkah</button>
                )}
              </div>
              <input
                type="text"
                placeholder="Judul Langkah (misal: Verifikasi Berkas)"
                value={proc.title}
                onChange={(e) => handleProcedureChange(idx, 'title', e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 font-bold text-slate-900"
                required
              />
              <textarea
                rows={1}
                placeholder="Uraian langkah..."
                value={proc.description}
                onChange={(e) => handleProcedureChange(idx, 'description', e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 text-xs"
              ></textarea>
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-soft"
          >
            {submitting ? 'Menyimpan...' : 'Simpan Layanan Publik'}
          </button>
        </div>
      </form>
    </div>
  );
}
