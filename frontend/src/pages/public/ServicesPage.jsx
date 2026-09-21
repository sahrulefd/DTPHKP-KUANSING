import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../api/services';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchServices();
  }, [search]);

  const fetchServices = async () => {
    try {
      const data = await getServices(search);
      setServices(data.data);
    } catch {
      // Handled silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <ScrollReveal animation="fade-down" delay={0}>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600 bg-primary-100 px-3 py-1 rounded-full inline-block hover:scale-105 transition-transform">
            Katalog Pelayanan Publik
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Daftar Layanan Publik DTPHKP</h1>
          <p className="text-slate-600">
            Silakan pilih jenis pelayanan publik di bawah ini untuk melihat persyaratan, prosedur, jangka waktu, dan mengajukan permohonan secara online.
          </p>
        </div>
      </ScrollReveal>

      {/* Search Input */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari jenis layanan... (Contoh: Alsintan, Pupuk, Kelompok Tani)"
              className="w-full px-5 py-3.5 pl-11 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-soft bg-white text-slate-800 text-sm transition-all duration-300 focus:shadow-md"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </ScrollReveal>

      {/* Services Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-soft">
          <p className="text-slate-500">Layanan tidak ditemukan untuk pencarian "{search}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} animation="fade-up" delay={index * 80}>
              <div className="bg-white rounded-2xl p-6 shadow-card hover-card-lift border border-slate-200/80 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 16 15" />
                      </svg>
                      <span>Jangka Waktu:</span>
                    </span>
                    <span className="font-semibold text-slate-800">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
                        <text x="12" y="15.2" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">Rp</text>
                      </svg>
                      <span>Biaya:</span>
                    </span>
                    <span className="font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      {service.cost}
                    </span>
                  </div>

                  <Link
                    to={`/layanan/${service.slug}`}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-soft hover:shadow-primary-600/30 hover-shine-effect"
                  >
                    <span>Lihat Detail &amp; Ajukan</span>
                    <svg className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9.5" />
                      <path d="M12 8l4 4-4 4M8 12h8" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
