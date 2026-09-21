import { useState, useEffect } from 'react';
import { getGuides } from '../../api/public';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ScrollReveal from '../../components/common/ScrollReveal';

const DEFAULT_GUIDES = [
  {
    id: 1,
    title: 'Panduan Pendaftaran Akun Masyarakat',
    slug: 'panduan-pendaftaran-akun-masyarakat',
    sort_order: 1,
    content: `## Langkah-langkah Mendaftar Akun Pemohon:
1. Akses halaman utama website **DTPHKP Kabupaten Kuantan Singingi** dan klik tombol **Register** di sudut kanan atas.
2. Isi formulir pendaftaran akun dengan data diri Anda secara lengkap dan akurat:
   - **Nama Lengkap**: Isikan nama sesuai dengan KTP Anda.
   - **NIK (16 Digit)**: Masukkan Nomor Induk Kependudukan yang valid.
   - **Nomor Telepon / WhatsApp**: Masukkan nomor aktif untuk menerima notifikasi status pengajuan.
   - **Alamat Lengkap**: Isikan alamat domisili atau tempat tinggal Anda.
   - **Email**: Masukkan alamat email yang aktif.
   - **Kata Sandi (Password)**: Buat kata sandi minimal 8 karakter yang aman.
3. Pastikan seluruh data NIK, email, dan nomor HP sudah diperiksa dengan teliti.
4. Klik tombol **Daftar** untuk memproses registrasi akun.
5. Setelah berhasil, Anda akan otomatis masuk ke **Dashboard Pelayanan Masyarakat**.

![Formulir Registrasi Akun Pemohon](/panduan/Registrasi.png)`
  },
  {
    id: 2,
    title: 'Panduan Login ke Portal Pelayanan',
    slug: 'panduan-login-ke-portal-pelayanan',
    sort_order: 2,
    content: `## Langkah-langkah Login / Masuk ke Sistem:
1. Buka halaman utama website DTPHKP dan klik tombol **Login / Masuk**.
2. Masukkan **NIK atau Alamat Email** terdaftar pada kolom **NIK / Email**.
3. Masukkan **Kata Sandi (Password)** akun Anda dengan benar.
4. Klik tombol **Masuk Sekarang** untuk mengakses halaman Dashboard Pemohon.
5. Jika Anda mengalami kendala masuk, gunakan fitur pendaftaran ulang atau hubungi layanan bantuan DTPHKP.

![Halaman Login Masuk Akun Pemohon](/panduan/Login.png)`
  },
  {
    id: 3,
    title: 'Panduan Pengelolaan Profil & Data Diri',
    slug: 'panduan-pengelolaan-profil-data-diri',
    sort_order: 3,
    content: `## Langkah-langkah Mengelola Profil Akun:
1. Setelah berhasil login, klik menu **Profil Saya** di bagian navigasi atas atau menu samping.
2. Periksa kelengkapan dan kebenaran data identitas Anda (**NIK**, **Nama Lengkap**, **Nomor HP/WA**, dan **Alamat**).
3. Apabila terjadi perubahan nomor telepon WhatsApp atau alamat domisili, perbarui data pada kolom formulir profil.
4. Klik tombol **Simpan Perubahan** untuk menyimpan perbaruan data akun Anda.

![Halaman Pengaturan Profil Pemohon](/panduan/profil.png)`
  },
  {
    id: 4,
    title: 'Panduan Navigasi & Fitur Dashboard',
    slug: 'panduan-navigasi-fitur-dashboard',
    sort_order: 4,
    content: `## Memahami Tampilan & Fitur Dashboard Pemohon:
1. Setelah login, Anda akan disambut oleh halaman **Dashboard Utama Pelayanan**.
2. Perhatikan kartu ringkasan status permohonan:
   - **Total Pengajuan**: Menampilkan jumlah keseluruhan permohonan layanan yang telah Anda buat.
   - **Sedang Diproses**: Menampilkan permohonan berkas yang sedang dalam tahap verifikasi atau proses dinas.
   - **Selesai**: Menampilkan permohonan yang telah selesai dan dokumen resminya terbit.
3. Gunakan tombol pintasan **Ajukan Layanan Baru** untuk membuat permohonan layanan secara cepat.
4. Akses daftar **Aktivitas Terakhir** untuk melihat perkembangan pengajuan permohonan Anda.

![Tampilan Dashboard Utama Pemohon DTPHKP](/panduan/Dashboard.png)`
  },
  {
    id: 5,
    title: 'Panduan Memilih Jenis Layanan Online',
    slug: 'panduan-memilih-jenis-layanan-online',
    sort_order: 5,
    content: `## Langkah-langkah Memilih Layanan Publik DTPHKP:
1. Buka menu **Daftar Layanan** pada navigasi utama portal DTPHKP.
2. Jelajahi katalog pelayanan publik yang tersedia di bidang Tanaman Pangan, Hortikultura, dan Peternakan.
3. Pilih jenis permohonan layanan yang Anda butuhkan, kemudian klik tombol **Detail Layanan**.
4. Pelajari informasi detail mengenai **Deskripsi Layanan**, **Waktu Penyelesaian**, **Biaya (Gratis/Rp 0)**, serta **Dokumen Persyaratan Wajib**.
5. Klik tombol **Ajukan Layanan Ini** untuk memulai prosedur permohonan online.

![Katalog dan Form Pemilihan Jenis Layanan](/panduan/Pilih Jenis Layanan.png)`
  },
  {
    id: 6,
    title: 'Panduan Pengisian Form & Unggah Berkas Persyaratan',
    slug: 'panduan-pengisian-form-unggah-berkas-persyaratan',
    sort_order: 6,
    content: `## Langkah-langkah Pengisian Formulir & Unggah Dokumen:
1. Isikan **Catatan / Keterangan Tambahan** permohonan jika diperlukan oleh dinas.
2. Cermati daftar **Dokumen Persyaratan** yang ditagihkan pada halaman formulir.
3. Klik tombol **Pilih File / Upload** pada masing-masing item dokumen persyaratan.
4. Unggah berkas dalam format **PDF, JPG, atau PNG** dengan batas ukuran maksimal **5 MB** per berkas.
5. Pastikan dokumen yang diunggah jelas, terbaca, dan tidak buram/terpotong.
6. Periksa status berkas hingga muncul indikator **Terunggah / File Berhasil Diupload**.

![Halaman Pengisian Form dan Unggah Persyaratan](/panduan/Unggah Persyaratan.png)`
  },
  {
    id: 7,
    title: 'Panduan Konfirmasi & Submit Pengajuan',
    slug: 'panduan-konfirmasi-submit-pengajuan',
    sort_order: 7,
    content: `## Langkah-langkah Mengirim & Finalisasi Permohonan:
1. Lakukan peninjauan akhir (review) atas seluruh formulir dan lampiran dokumen persyaratan.
2. Pastikan data yang dimasukkan serta berkas yang diunggah sudah lengkap dan benar.
3. Klik tombol **Submit Pengajuan** / **Kirim Permohonan**.
4. Setelah berhasil, sistem akan secara otomatis mengarahkan Anda ke **Halaman Detail Pengajuan** di Dashboard Akun Anda.
5. Pengajuan Anda telah resmi tercatat di dalam sistem dan dapat langsung dipantau melalui menu **Riwayat Pengajuan**.

![Konfirmasi Pengajuan & Detail Pengajuan](/panduan/Submit Pengajuan.png)`
  },
  {
    id: 8,
    title: 'Panduan Melacak Status & Mengunduh Hasil Layanan',
    slug: 'panduan-melacak-status-mengunduh-hasil-layanan',
    sort_order: 8,
    content: `## Langkah-langkah Memantau Status & Mengunduh Dokumen Hasil:
1. Buka menu **Riwayat Pengajuan** pada Dashboard Akun Pemohon.
2. Cari pengajuan permohonan Anda, lalu klik tombol **Detail Pengajuan**.
3. Pantau kronologi status pengajuan Anda:
   - **Menunggu Verifikasi**: Berkas baru masuk dan antre untuk diperiksa verifikator dinas.
   - **Diproses / Diverifikasi**: Berkas memenuhi syarat dan sedang diproses oleh bidang terkait.
   - **Perlu Perbaikan / Ditolak**: Berkas tidak sesuai (alasan penolakan / catatan revisi dapat dibaca di kolom detail).
   - **Selesai**: Permohonan disetujui dan dokumen resmi telah diterbitkan.
4. Apabila status **Selesai**, klik tombol **Unduh Dokumen Hasil / Sertifikat** untuk menyimpan file surat resmi ber-stempel/QR-code.

![Halaman Riwayat Pengajuan & Status Dokumen](/panduan/Riwayat Pengajuan.png)`
  }
];

export default function GuidePage() {
  const [guides, setGuides] = useState(DEFAULT_GUIDES);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const fetchGuides = async () => {
    try {
      const res = await getGuides();
      if (res && res.data && res.data.length > 0) {
        setGuides(res.data);
      }
    } catch {
      // Use fallback DEFAULT_GUIDES if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const parseFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong
            key={index}
            className="font-bold text-slate-900 bg-primary-50 text-primary-950 px-1.5 py-0.5 rounded border border-primary-200/80 inline-block my-0.5 shadow-2xs"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs border border-slate-300">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const renderContentBlock = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let currentList = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <div key={`list-${elements.length}`} className="space-y-3 my-4">
            {currentList.map((item, i) => {
              if (item.type === 'numbered') {
                return (
                  <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-primary-300 hover:shadow-soft transition-all duration-300">
                    <span className="shrink-0 w-7 h-7 rounded-xl bg-primary-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                      {item.number}
                    </span>
                    <div className="text-sm text-slate-700 leading-relaxed pt-0.5">
                      {parseFormattedText(item.text)}
                    </div>
                  </div>
                );
              } else if (item.type === 'bullet') {
                return (
                  <div key={i} className="flex items-start gap-3 pl-10 text-sm text-slate-700 py-1">
                    <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-2"></span>
                    <div className="leading-relaxed">{parseFormattedText(item.text)}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
        currentList = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Heading ##
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h3 key={`h-${idx}`} className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-primary-600 rounded-full"></span>
            {trimmed.replace('## ', '')}
          </h3>
        );
        return;
      }

      // Image ![alt](url)
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        flushList();
        const altText = imgMatch[1];
        const imgUrl = imgMatch[2];
        elements.push(
          <div key={`img-${idx}`} className="my-6 bg-slate-900/5 rounded-3xl p-3 border border-slate-200 shadow-soft space-y-2">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-xl font-medium">
              <span className="flex items-center gap-2 font-bold text-blue-400">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Tampilan Layar ({altText})
              </span>
              <button
                onClick={() => setSelectedImage({ url: imgUrl, title: altText })}
                className="px-2.5 py-1 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-[11px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Perbesar Screenshot
              </button>
            </div>
            <div
              className="relative group overflow-hidden rounded-2xl cursor-pointer border border-slate-200 bg-slate-950/80 shadow-inner"
              onClick={() => setSelectedImage({ url: imgUrl, title: altText })}
            >
              <img
                src={imgUrl}
                alt={altText}
                className="w-full h-auto object-contain max-h-[520px] mx-auto hover-image-zoom"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 bg-slate-900/90 text-white rounded-xl text-xs font-bold shadow-lg border border-white/20 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Klik untuk melihat ukuran penuh
                </span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 italic font-medium pt-1">
              Gambar: {altText} (Klik gambar untuk zoom)
            </p>
          </div>
        );
        return;
      }

      // Numbered Step 1. 2. 3.
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        currentList.push({
          type: 'numbered',
          number: numMatch[1],
          text: numMatch[2]
        });
        return;
      }

      // Sub-bullet - or   -
      const bulletMatch = trimmed.match(/^-\s+(.*)$/);
      if (bulletMatch) {
        currentList.push({
          type: 'bullet',
          text: bulletMatch[1]
        });
        return;
      }

      // Regular text
      if (trimmed.length > 0) {
        flushList();
        elements.push(
          <p key={`p-${idx}`} className="text-sm text-slate-700 leading-relaxed my-2">
            {parseFormattedText(trimmed)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  const filteredGuides = guides.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === 'all' || g.id.toString() === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      {/* Header Banner */}
      <ScrollReveal animation="fade-down" delay={0}>
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-primary-950 to-primary-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-primary-900">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-32 -bottom-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs font-bold tracking-wide uppercase hover:scale-105 transition-transform">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Pusat Bantuan &amp; Tutorial Resmi
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Panduan Penggunaan Website DTPHKP
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Petunjuk lengkap pengajuan permohonan layanan publik online di Dinas Tanaman Pangan, Hortikultura, dan Peternakan Kabupaten Kuantan Singingi dilengkapi dengan penjelasannya &amp; contoh screenshot.
            </p>

            {/* Search Box */}
            <div className="pt-4 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari kata kunci panduan (misal: Registrasi, Upload Berkas, Cek Status)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm shadow-inner transition-all duration-300"
                />
                <svg className="w-5 h-5 text-blue-200/70 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Navigation Tabs */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary-600 text-white shadow-soft scale-105'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Semua Modul Panduan ({guides.length})
          </button>
          {guides.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setActiveTab(g.id.toString())}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeTab === g.id.toString()
                  ? 'bg-primary-600 text-white shadow-soft font-extrabold scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 text-current text-[10px] flex items-center justify-center font-black">
                {idx + 1}
              </span>
              {g.title.replace('Panduan ', '')}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Content Section */}
      {loading ? (
        <div className="py-20">
          <LoadingSpinner />
        </div>
      ) : filteredGuides.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-soft space-y-3">
          <svg className="w-12 h-12 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-bold text-slate-800">Panduan tidak ditemukan</h3>
          <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian Anda.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredGuides.map((guide, idx) => (
            <ScrollReveal key={guide.id} animation="fade-up" delay={idx * 80}>
              <div
                id={`guide-${guide.id}`}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6 hover-card-lift transition-all duration-300"
              >
                {/* Module Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-primary-600 text-white font-extrabold flex items-center justify-center text-base shadow-soft shadow-primary-600/30">
                      {guide.sort_order || idx + 1}
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">{guide.title}</h2>
                      <p className="text-xs text-slate-500 font-medium">Modul Bantuan Sistem Pelayanan Publik Online DTPHKP</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200">
                    Langkah {guide.sort_order || idx + 1} dari {guides.length}
                  </span>
                </div>

                {/* Parsed Steps & Screenshots */}
                <div className="space-y-4">
                  {renderContentBlock(guide.content)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Lightbox Image Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-modal border border-slate-700 space-y-3 p-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <h4 className="text-sm font-bold text-white">{selectedImage.title}</h4>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all hover:rotate-90 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[80vh] flex items-center justify-center bg-black/60 rounded-2xl p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center text-xs text-slate-400 font-medium pt-1">
              Gunakan tombol Esc atau klik area luar untuk menutup preview gambar
            </div>
          </div>
        </div>
      )}

      {/* Help Card Footer */}
      <ScrollReveal animation="zoom-in" delay={150}>
        <div className="bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-primary-800 hover-card-lift">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-extrabold">Membutuhkan Bantuan Lebih Lanjut?</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Tim verifikator dan customer service DTPHKP Kabupaten Kuantan Singingi siap membantu kendala permohonan Anda.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/faq"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-105"
            >
              Lihat FAQ
            </a>
            <a
              href="/kontak"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black transition-all duration-300 shadow-lg shadow-blue-600/30 hover:scale-105 hover-shine-effect"
            >
              Hubungi Kontak Dinas
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
