import { useState, useEffect } from 'react';
import { getSettings } from '../../api/public';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';

export default function ContactPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data.data);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <ScrollReveal animation="fade-down" delay={0}>
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-100 px-3 py-1 rounded-full inline-block hover:scale-105 transition-transform">
            Hubungi Kami
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">Kontak &amp; Alamat Kantor</h1>
          <p className="text-slate-600">
            Informasi alamat lokasi kantor, nomor pengaduan resmi, dan jam operasional pelayanan.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScrollReveal animation="fade-right" delay={100}>
          <div className="bg-white rounded-3xl p-8 shadow-card hover-card-lift border border-slate-200/80 space-y-6 h-full">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">Informasi Perkantoran</h2>

            <div className="space-y-5 text-sm text-slate-700">
              <div className="flex items-start gap-3 group">
                <img src="https://img.icons8.com/color/48/google-maps.png" alt="Maps" className="w-6 h-6 object-contain shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="block text-slate-900 font-black">Alamat Kantor:</strong>
                  <p className="mt-0.5 text-slate-600 leading-relaxed">{settings.office_address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp" className="w-6 h-6 object-contain shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="block text-slate-900 font-black">Telepon / WhatsApp Pengaduan:</strong>
                  <p className="mt-0.5 text-slate-800 font-mono font-bold text-blue-700">{settings.office_phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <img src="https://img.icons8.com/color/48/new-post.png" alt="Email" className="w-6 h-6 object-contain shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="block text-slate-900 font-black">Email Resmi:</strong>
                  <p className="mt-0.5 text-slate-700 font-mono">{settings.office_email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 16 15" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-slate-900 font-black">Jam Operasional Pelayanan:</strong>
                  <p className="mt-0.5 text-slate-700">{settings.office_hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" className="w-6 h-6 object-contain shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="block text-slate-900 font-black">Instagram Resmi:</strong>
                  <p className="mt-0.5 text-slate-700 font-medium">{settings.office_instagram}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Map Embed & Direct Link */}
        <ScrollReveal animation="fade-left" delay={200}>
          <div className="bg-white rounded-3xl p-6 shadow-card hover-card-lift border border-slate-200/80 flex flex-col justify-between space-y-4 h-full">
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Lokasi Peta Perkantoran</h3>
              <p className="text-xs text-slate-500 mb-3">Klik tombol di bawah ini untuk mengaktifkan petunjuk arah navigasi GPS.</p>
              <a
                href="https://maps.app.goo.gl/tTpdBMgf7L5xpJ6XA?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-soft transition-all duration-300 hover:scale-105 active:scale-95 mb-4 hover-shine-effect"
              >
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Buka Lokasi di Google Maps</span>
                <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 8l4 4-4 4M8 12h8" />
                </svg>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 min-h-[320px] flex-1 shadow-inner group">
              <iframe
                title="Lokasi Kantor DTPHKP Kuansing"
                src={settings.maps_embed || "https://maps.google.com/maps?q=FGVR%2B245%2C+Sungai+Jering%2C+Kec.+Kuantan+Tengah%2C+Kabupaten+Kuantan+Singingi%2C+Riau+29566&t=&z=16&ie=UTF8&iwloc=&output=embed"}
                className="w-full h-full min-h-[320px] border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
