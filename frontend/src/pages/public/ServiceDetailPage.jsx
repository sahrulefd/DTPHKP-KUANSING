import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceBySlug } from '../../api/services';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceDetail();
  }, [slug]);

  const fetchServiceDetail = async () => {
    try {
      const data = await getServiceBySlug(slug);
      setService(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/dashboard/pengajuan/baru?service=${service.id}` } } });
    } else {
      navigate(`/dashboard/pengajuan/baru?service=${service.id}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!service) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-600">Layanan tidak ditemukan.</p>
        <Link to="/layanan" className="text-primary-600 font-bold mt-4 inline-flex items-center gap-1.5">
          <img src="/back-icon.png" alt="Kembali" className="w-4 h-4 object-contain inline-block" />
          <span>Kembali ke Daftar Layanan</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-slate-800">Beranda</Link>
        <span>/</span>
        <Link to="/layanan" className="hover:text-slate-800">Daftar Layanan</Link>
        <span>/</span>
        <span className="text-primary-700">{service.name}</span>
      </div>

      {/* Header Info Banner */}
      <div className="bg-white rounded-3xl p-8 shadow-card border border-slate-200/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
              Pelayanan Publik Resmi
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">{service.name}</h1>
            <p className="text-slate-600 leading-relaxed max-w-3xl">{service.description}</p>
          </div>

          {/* Header Info without duplicate top button */}
        </div>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 16 15" />
              </svg>
              <span>Jangka Waktu</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{service.duration}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
                <text x="12" y="15.2" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Rp</text>
              </svg>
              <span>Biaya / Tarif</span>
            </div>
            <p className="text-sm font-bold text-green-700">{service.cost}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <span>Produk Pelayanan</span>
            </div>
            <p className="text-sm font-bold text-slate-900 truncate">{service.product}</p>
          </div>
        </div>
      </div>

      {/* Grid Requirements & Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Requirements */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <img src="/document-icon.png" alt="Dokumen" className="w-6 h-6 object-contain inline-block" /> Persyaratan Pelayanan
          </h3>
          <ul className="space-y-3">
            {service.requirements?.map((req, index) => (
              <li key={req.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {req.name}
                    {req.is_required && <span className="text-red-500 ml-1">*</span>}
                  </p>
                  {req.description && <p className="text-xs text-slate-500 mt-0.5">{req.description}</p>}
                  {req.file_type && <span className="inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded mt-1">Format: {req.file_type.toUpperCase()}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Procedures */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <img src="/procedure-icon.png" alt="Prosedur" className="w-6 h-6 object-contain inline-block" /> Mekanisme / Prosedur
          </h3>
          <ol className="space-y-3">
            {service.procedures?.map((proc) => (
              <li key={proc.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {proc.step_number}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{proc.title}</p>
                  {proc.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proc.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Additional Legal & Complaint Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <img src="/legal-icon.png" alt="Dasar Hukum" className="w-4 h-4 object-contain inline-block" /> Dasar Hukum
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">{service.legal_basis}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <img src="/complaint-icon.png" alt="Penanganan Pengaduan" className="w-4 h-4 object-contain inline-block" /> Penanganan Pengaduan
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">{service.complaint_handling}</p>
        </div>
      </div>

      {/* Bottom Apply Floating Banner */}
      <div className="bg-gradient-primary rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
        <div>
          <h3 className="text-2xl font-bold">Siap Mengajukan Permohonan?</h3>
          <p className="text-sm text-primary-100 mt-1">Pastikan seluruh berkas dokumen persyaratan telah Anda siapkan dalam format PDF/JPG.</p>
        </div>
        <button
          onClick={handleApply}
          className="px-8 py-3.5 bg-white text-primary-900 font-extrabold rounded-2xl hover:bg-primary-50 transition shadow-lg shrink-0 inline-flex items-center gap-2"
        >
          <span>Ajukan Sekarang</span>
          <svg className="w-4 h-4 text-primary-900 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M12 8l4 4-4 4M8 12h8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
