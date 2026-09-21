import { formatDate } from '../../utils/formatters';
import { DINAS_NAME, KABUPATEN_NAME } from '../../utils/constants';

export default function PrintLetterModal({ isOpen, onClose, submission }) {
  if (!isOpen || !submission) return null;

  const handlePrint = () => {
    window.print();
  };

  const getLetterTitle = (serviceName = '') => {
    const nameLower = serviceName.toLowerCase();
    if (nameLower.includes('pendaftaran kelompok tani')) {
      return 'SURAT KETERANGAN REGISTRASI KELOMPOK TANI';
    }
    if (nameLower.includes('izin edar') || nameLower.includes('psat')) {
      return 'SURAT REKOMENDASI IZIN EDAR PANGAN SEGAR (PSAT)';
    }
    if (nameLower.includes('alsintan')) {
      return 'SURAT KETERANGAN PERMOHONAN BANTUAN ALSINTAN';
    }
    if (nameLower.includes('pupuk')) {
      return 'SURAT KETERANGAN REGISTRASI RDKK PUPUK SUBSIDI';
    }
    return 'SURAT KETERANGAN HASIL PELAYANAN PUBLIK';
  };

  const currentYear = new Date(submission.updated_at || submission.created_at).getFullYear();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static">
      {/* Container */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 print:shadow-none print:border-none print:max-h-none print:w-full print:rounded-none">
        
        {/* Toolbar (Hidden when printing) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 p-1.5 rounded-lg text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" rx="1" />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-sm text-white">Pratinjau Surat Resmi A4</h3>
              <p className="text-[11px] text-slate-400">Silakan periksa lembar surat sebelum dicetak atau disimpan ke PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v8H6z" />
              </svg>
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              ✖ Tutup
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-slate-100 print:bg-white print:p-0 print:overflow-visible">
          <div
            id="print-letter-content"
            className="bg-white mx-auto max-w-[210mm] min-h-[297mm] p-8 sm:p-12 shadow-card print:shadow-none border border-slate-200 print:border-none font-serif text-slate-900 leading-relaxed text-sm relative"
          >
            {/* KOP SURAT */}
            <div className="border-b-4 border-double border-slate-900 pb-4 mb-6">
              <div className="flex items-center justify-between gap-4">
                <img
                  src="/kop-logo.png"
                  alt="Logo Pemkab Kuansing"
                  className="h-24 w-auto object-contain shrink-0"
                  onError={(e) => { e.target.src = '/logo.png'; }}
                />
                <div className="text-center flex-1 space-y-0.5">
                  <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider text-slate-900 leading-tight">
                    PEMERINTAH KABUPATEN KUANTAN SINGINGI
                  </h3>
                  <h2 className="font-black text-base sm:text-lg uppercase tracking-wide text-slate-900 leading-tight">
                    DINAS TANAMAN PANGAN, HORTIKULTURA<br />DAN KETAHANAN PANGAN
                  </h2>
                  <p className="text-[11px] font-sans text-slate-800 leading-tight pt-0.5">
                    KOMPLEK PERKANTORAN PEMERINTAH DAERAH KABUPATEN KUANTAN SINGINGI
                  </p>
                  <p className="text-xs font-sans font-bold text-slate-900 tracking-wider">
                    TELUK KUANTAN
                  </p>
                </div>
                <div className="w-20 shrink-0"></div> {/* Spacer for symmetry */}
              </div>
            </div>

            {/* SURAT HEADER & NUMBER */}
            <div className="text-center my-6 space-y-1">
              <h1 className="font-bold text-base sm:text-lg uppercase tracking-wide underline text-slate-900">
                {getLetterTitle(submission.service?.name)}
              </h1>
              <p className="font-sans text-xs text-slate-700 font-medium">
                Nomor: 500.1.1/{String(submission.id).padStart(4, '0')}/DTPHKP/{currentYear}
              </p>
            </div>

            {/* OPENING */}
            <div className="space-y-4 my-6 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
              <p>
                Yang bertanda tangan di bawah ini, Kepala {DINAS_NAME} {KABUPATEN_NAME}, dengan ini menerangkan bahwa:
              </p>

              {/* PEMOHON TABLE */}
              <div className="pl-4 sm:pl-8 space-y-2 font-mono text-xs border-l-2 border-slate-300 py-1 my-3 bg-slate-50/50 p-3 rounded-r-lg">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-600 font-sans font-bold">Nama Pemohon</span>
                  <span className="col-span-8 font-bold text-slate-900">: {submission.user?.name || '-'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-600 font-sans">NIK</span>
                  <span className="col-span-8 font-semibold text-slate-900">: {submission.user?.nik || '-'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-600 font-sans">Telepon / WhatsApp</span>
                  <span className="col-span-8 text-slate-900">: {submission.user?.phone || '-'}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-600 font-sans">Alamat / Wilayah</span>
                  <span className="col-span-8 text-slate-900">: {submission.user?.address || 'Kabupaten Kuantan Singingi'}</span>
                </div>
              </div>

              {/* PELAYANAN STATEMENT */}
              <p>
                Telah selesai mengajukan permohonan pelayanan publik online dengan rincian data permohonan sebagai berikut:
              </p>

              <div className="pl-4 sm:pl-8 space-y-2 text-xs font-sans border border-slate-200 p-4 rounded-xl bg-white shadow-2xs">
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-500 font-bold">Jenis Pelayanan</span>
                  <span className="col-span-8 font-bold text-blue-900">: {submission.service?.name}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-500 font-bold">Nomor Registrasi / Tracking</span>
                  <span className="col-span-8 font-mono font-bold text-slate-900">: {submission.tracking_number}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-500">Tanggal Pengajuan</span>
                  <span className="col-span-8">: {formatDate(submission.created_at)}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-500">Tanggal Disetujui / Selesai</span>
                  <span className="col-span-8 font-bold text-green-700">: {formatDate(submission.updated_at || submission.created_at)}</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-slate-500 font-bold">Produk Hasil Pelayanan</span>
                  <span className="col-span-8 font-bold text-slate-900">: {submission.service?.product || 'Surat Rekomendasi Pelayanan'}</span>
                </div>
                {submission.admin_notes && (
                  <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-100">
                    <span className="col-span-4 text-slate-500 italic">Catatan Petugas</span>
                    <span className="col-span-8 text-slate-700 italic">: {submission.admin_notes}</span>
                  </div>
                )}
              </div>

              {/* CLOSING STATEMENT */}
              <p className="pt-2 text-justify">
                Berdasarkan hasil verifikasi administrasi dan teknis oleh tim {DINAS_NAME} {KABUPATEN_NAME}, permohonan tersebut di atas dinyatakan <strong>MEMENUHI SYARAT DAN DISAHKAN (SELESAI)</strong> sesuai dengan Standar Pelayanan Publik DTPHKP Kuansing.
              </p>

              <p className="text-justify">
                Demikian surat keterangan hasil pelayanan ini diterbitkan untuk dipergunakan sebagaimana mestinya.
              </p>
            </div>

            {/* FOOTER & TTD BLOCK */}
            <div className="mt-12 pt-6 grid grid-cols-2 gap-6 items-end font-sans text-xs">
              {/* QR Verification Block */}
              <div className="space-y-2 border border-slate-200 p-3 rounded-xl bg-slate-50/80 max-w-xs">
                <a
                  href={`/verifikasi/${submission.tracking_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-14 h-14 bg-slate-900 text-white p-1 rounded flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-blue-900 transition">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v3h-3v-3zm0 5h3v3h-3v-3zm-5-5h3v3h-3v-3zm0 5h3v3h-3v-3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[10px] uppercase text-slate-800 group-hover:text-blue-600 transition">Verifikasi Keaslian Dokumen</p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                      Scan QR atau klik untuk cek validitas di Portal DTPHKP.
                    </p>
                    <p className="text-[9px] font-mono text-blue-700 font-bold mt-1 underline">
                      {submission.tracking_number}
                    </p>
                  </div>
                </a>
              </div>

              {/* TTD & Cap Stempel Official */}
              <div className="text-center space-y-1 ml-auto max-w-xs w-full">
                <p>Teluk Kuantan, {formatDate(submission.updated_at || submission.created_at)}</p>
                <p className="font-bold text-slate-900 uppercase leading-tight text-xs">
                  KEPALA DINAS TANAMAN PANGAN,<br />HORTIKULTURA DAN KETAHANAN PANGAN<br />KABUPATEN KUANTAN SINGINGI
                </p>

                {/* Stempel & TTD Image */}
                <div className="relative my-1 flex justify-center items-center h-28">
                  <img
                    src="/ttd.png"
                    alt="TTD & Cap Stempel Kepala Dinas DTPHKP"
                    className="h-28 w-auto object-contain drop-shadow-xs"
                    onError={(e) => { e.target.src = '/ttd-stempel.png'; }}
                  />
                </div>

                <p className="font-bold text-slate-900 underline text-sm leading-none pt-1">
                  Deflides Gusni, SP., M. Si
                </p>
                <p className="text-[11px] text-slate-800 font-medium">
                  Pembina Utama Muda / (IV/c)
                </p>
                <p className="text-[10px] font-mono text-slate-700">
                  NIP. 19691231 200003 1 026
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
