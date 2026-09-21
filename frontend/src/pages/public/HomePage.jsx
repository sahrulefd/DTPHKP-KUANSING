import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../../api/services';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';
import { DINAS_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [totalServicesCount, setTotalServicesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      const list = data.data || [];
      setServices(list.slice(0, 6)); // Display top 6 services on home
      setTotalServicesCount(list.length);
    } catch {
      // Handled silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white relative overflow-hidden py-20 lg:py-28 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <ScrollReveal animation="fade-down" delay={0}>
              <div className="inline-flex items-center gap-2 bg-blue-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-blue-200 border border-blue-700/50 shadow-sm hover:scale-105 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>Portal Pelayanan Publik Digital</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-md">
                Pelayanan Cepat, Transparan &amp; Bebas Pungli
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-lg text-slate-200 leading-relaxed font-normal">
                Selamat datang di Portal Pelayanan &amp; Administrasi Resmi {DINAS_NAME} {KABUPATEN_NAME}. Ajukan layanan permohonan kelompok tani, alsintan, pupuk bersubsidi, dan perizinan secara online.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/layanan"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-extrabold transition-all duration-300 shadow-lg hover:shadow-blue-600/30 hover:scale-105 active:scale-95 transform flex items-center gap-2 hover-shine-effect"
                >
                  <span>Lihat Semua Layanan</span>
                  <svg className="w-4 h-4 text-white shrink-0 hover-icon-tilt" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <path d="M12 8l4 4-4 4M8 12h8" />
                  </svg>
                </Link>
                <Link
                  to="/panduan"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50"
                >
                  Panduan Pengajuan
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 [clip-path:polygon(0_100%,100%_100%,100%_0)]"></div>
      </section>

      {/* Portal Quick Access & Riwayat Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <ScrollReveal animation="zoom-in" delay={150}>
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-elevated border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 hover-card-lift">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block hover:scale-105 transition-transform">
                Sistem Online Administrasi DTPHKP
              </span>
              <h2 className="text-2xl font-black text-slate-900">Portal Layanan &amp; Riwayat Permohonan</h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Ajukan permohonan surat, bantuan pupuk, alsintan, atau kelola riwayat status berkas pengajuan Anda secara terpusat melalui dashboard masyarakat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/dashboard/pengajuan/baru"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 hover-shine-effect"
              >
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>Buat Surat / Ajukan Baru</span>
              </Link>
              <Link
                to="/dashboard/pengajuan"
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-300 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-slate-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <span>Lihat Riwayat Pengajuan</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Layanan Publik Unggulan</h2>
              <p className="text-slate-600 mt-1">Daftar pelayanan yang tersedia untuk kelompok tani &amp; masyarakat</p>
            </div>
            <Link to="/layanan" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-all duration-200 inline-flex items-center gap-1.5 hover:translate-x-1">
              <span>Lihat Semua {totalServicesCount > 0 ? `${totalServicesCount} ` : ''}Layanan</span>
              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 8l4 4-4 4M8 12h8" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover-card-lift border border-slate-200/80 flex flex-col justify-between group h-full">
                  <div className="space-y-3">
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

                  <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <polyline points="12 7 12 12 16 15" />
                      </svg>
                      <span>{service.duration}</span>
                    </span>
                    <Link
                      to={`/layanan/${service.slug}`}
                      className="font-bold text-primary-600 hover:text-primary-800 transition inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Detail Layanan</span>
                      <svg className="w-3.5 h-3.5 text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </section>

      {/* Why Choose Us / Guarantees */}
      <section className="bg-slate-950 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-down" delay={0}>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-3xl font-black text-white">Komitmen Pelayanan Publik</h2>
              <p className="text-blue-300 font-medium">DTPHKP Kabupaten Kuantan Singingi menjamin pelayanan berkualitas</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-blue-950/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-blue-800/60 space-y-2 hover-card-lift hover:border-blue-500/80 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-black mb-3">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">100% Gratis</h3>
                <p className="text-sm text-slate-300 leading-relaxed">Seluruh proses pengajuan dan penerbitan berkas tidak dipungut biaya apapun.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-blue-950/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-blue-800/60 space-y-2 hover-card-lift hover:border-blue-500/80 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-black mb-3">
                  ⏱
                </div>
                <h3 className="text-xl font-black text-white">Proses Terukur</h3>
                <p className="text-sm text-slate-300 leading-relaxed">Setiap layanan memiliki standar waktu penyelesaian yang jelas dan dapat dipantau.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-blue-950/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-blue-800/60 space-y-2 hover-card-lift hover:border-blue-500/80 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-black mb-3">
                  🛡
                </div>
                <h3 className="text-xl font-black text-white">Transparan &amp; Akuntabel</h3>
                <p className="text-sm text-slate-300 leading-relaxed">Masyarakat dapat melihat alasan penolakan secara jelas jika berkas tidak lengkap.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
