import { Link } from 'react-router-dom';
import { APP_NAME, DINAS_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo DTPHKP"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="text-lg font-black text-white leading-tight">{APP_NAME}</h3>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">{KABUPATEN_NAME}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Portal resmi pelayanan dan administrasi publik {DINAS_NAME} {KABUPATEN_NAME}. Memberikan pelayanan yang cepat, akuntabel, transparan, dan tanpa dipungut biaya.
            </p>
            <div className="text-xs text-slate-500">
              SK SP No. 605 Tahun 2025 tentang Standar Pelayanan Publik DTPHKP Kuansing
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/layanan" className="hover:text-primary-400 transition">Daftar Layanan</Link></li>
              <li><Link to="/panduan" className="hover:text-primary-400 transition">Panduan Pengajuan</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition">Pertanyaan Umum (FAQ)</Link></li>
              <li><Link to="/kontak" className="hover:text-primary-400 transition">Kontak & Lokasi</Link></li>
              <li><Link to="/survei" className="hover:text-primary-400 transition">Survei SKM</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Kontak Resmi</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <img src="https://img.icons8.com/color/48/google-maps.png" alt="Maps" className="w-5 h-5 object-contain shrink-0 mt-0.5" />
                <div>
                  <span>Komplek Perkantoran Pemda Teluk Kuantan, Kab. Kuantan Singingi, Riau</span>
                  <a
                    href="https://maps.app.goo.gl/tTpdBMgf7L5xpJ6XA?g_st=aw"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-xs font-bold text-blue-400 hover:text-blue-300 underline mt-1"
                  >
                    <span className="inline-flex items-center gap-1">
                      <span>Buka di Google Maps</span>
                      <svg className="w-3.5 h-3.5 text-blue-400 shrink-0 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9.5" />
                        <path d="M12 8l4 4-4 4M8 12h8" />
                      </svg>
                    </span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain shrink-0" />
                <span>Telepon: 0823 7980 9018</span>
              </li>
              <li className="flex items-center gap-2.5">
                <img src="https://img.icons8.com/color/48/new-post.png" alt="Email" className="w-5 h-5 object-contain shrink-0" />
                <span>dtphkpkuansing@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" className="w-5 h-5 object-contain shrink-0" />
                <span>IG: @ketahananpangan.kuansing</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {DINAS_NAME} {KABUPATEN_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privasi</span>
            <span>Syarat & Ketentuan</span>
            <span>Bebas Pungli 100%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
