<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceProcedure;
use App\Models\ServiceRequirement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Pendaftaran Kelompok Tani',
                'description' => 'Pelayanan Pendaftaran Kelompok Tani meliputi kegiatan Sosialisasi dan Pembentukan Kelompok Tani di wilayah Kabupaten Kuantan Singingi.',
                'duration' => '2 Hari Kerja',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Pembentukan Kelompok Tani & Terdaftar di SIMLUHTAN',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, Nomor Pengaduan: 0823 7980 9018, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. Undang-undang Nomor 16 Tahun 2006 tentang Sistem Penyuluhan Pertanian Perikanan dan Kehutanan; 2. Peraturan Menteri Pertanian Nomor 67/Permentan/SM.050/12/2016 tentang Pembinaan Kelembagaan Petani.',
                'icon' => 'UserGroupIcon',
                'sort_order' => 1,
                'requirements' => [
                    ['name' => 'Berita Acara Pembentukan Kelompok Tani', 'description' => 'Dokumen berita acara hasil musyawarah pembentukan kelompok tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Struktur Pengurus Kelompok Tani', 'description' => 'Susunan pengurus (Ketua, Sekretaris, Bendahara, Anggota)', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Daftar Hadir Musyawarah', 'description' => 'Daftar hadir musyawarah pembentukan kelompok tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Daftar Anggota Kelompok Tani', 'description' => 'Daftar nama dan identitas seluruh anggota kelompok tani', 'is_required' => true, 'file_type' => 'pdf'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Musyawarah Petani', 'description' => 'Melalui Rapat Musyawarah bersama petani, mengajukan pembentukan kelompoktani kepada Penyuluh setempat.'],
                    ['step_number' => 2, 'title' => 'Fasilitasi Dokumen', 'description' => 'Memfasilitasi dan menyiapkan dokumen pembentukan kelompoktani oleh Penyuluh.'],
                    ['step_number' => 3, 'title' => 'Penandatanganan BPP', 'description' => 'Mengajukan dokumen pembentukan kelompoktani kepada Koordinator BPP untuk menandatangani Berita Acara Pembentukan Kelompoktani.'],
                    ['step_number' => 4, 'title' => 'Penandatanganan Kepala Desa', 'description' => 'Mengajukan dokumen pembentukan kelompoktani kepada Kepala Desa untuk menandatangani Berita Acara Pembentukan Kelompoktani.'],
                    ['step_number' => 5, 'title' => 'Penginputan SIMLUHTAN', 'description' => 'Menyerahkan dokumen pembentukan kelompoktani ke admin simluhtan kec/admin simluhtan kabupaten untuk dilakukan penginputan di Aplikasi SIMLUHTAN.'],
                    ['step_number' => 6, 'title' => 'Penyerahan Dokumen ke PSP', 'description' => 'Menyerahkan Fotocopy dokumen pembentukan kelompoktani ke Sub Koordinator Bidang PSP.'],
                ],
            ],
            [
                'name' => 'Pendampingan Kelompok Tani',
                'description' => 'Pelayanan Pendampingan Kelompok Tani / Penilaian Kelas Kemampuan Kelompok Tani meliputi kegiatan sosialisasi, rapat pertemuan, dan penilaian kelas kelompok tani.',
                'duration' => '14 Hari Kerja',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Pendampingan kelompok tani dan penilaian kelas kemampuan kelompok tani',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 16 Tahun 2006 tentang Sistem Penyuluhan Pertanian Perikanan dan Kehutanan; 2. Permentan No. 67/Permentan/SM.050/12/2016 tentang Pembinaan Kelembagaan Petani; 3. SK Kepala Badan Penyuluhan No. 25/Kpts/SM.016/I/02/18.',
                'icon' => 'AcademicCapIcon',
                'sort_order' => 2,
                'requirements' => [
                    ['name' => 'Bukti Kelompok Tani Aktif', 'description' => 'Bukti adanya pertemuan rutin dan memiliki administrasi dasar', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Bukti Terdaftar di SIMLUHTAN', 'description' => 'Bukti registrasi aktif di SIMLUHTAN', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Surat Kesepakatan Belajar Bersama', 'description' => 'Dokumen kesepakatan kelompok untuk belajar dan berkembang bersama', 'is_required' => true, 'file_type' => 'pdf'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Persiapan Penilaian', 'description' => 'Menyiapkan instrumen penilaian, metodologi penilaian, menyusun dan menetapkan jadwal penilaian serta menyiapkan organisasi penyelenggaraan penilaian.'],
                    ['step_number' => 2, 'title' => 'Penyampaian Rencana ke Kadis', 'description' => 'Menyampaikan rencana jadwal penilaian, instrumen penilaian, metodologi dan tim penilai kepada Kabid untuk diperiksa dan diparaf.'],
                    ['step_number' => 3, 'title' => 'Penandatanganan Jadwal Penilaian', 'description' => 'Menelaah dan menandatangani jadwal penilaian dan tim penilai dari tingkat desa sampai kabupaten.'],
                    ['step_number' => 4, 'title' => 'Penerusan ke Koordinator BPP', 'description' => 'Menerima jadwal penilaian yang sudah ditandatangani Kadis untuk diteruskan ke Koordinator BPP.'],
                    ['step_number' => 5, 'title' => 'Rapat Persiapan Penilaian', 'description' => 'Melakukan rapat persiapan penilaian di tingkat desa oleh penyuluh.'],
                    ['step_number' => 6, 'title' => 'Pelaksanaan Penilaian', 'description' => 'Melaksanakan penilaian kelas kemampuan kelompoktani di wilayah binaan penyuluh.'],
                    ['step_number' => 7, 'title' => 'Analisa & Laporan Penyuluh', 'description' => 'Menganalisa data serta membuat laporan hasil penilaian kelas kelompok tani kepada koordinator BPP.'],
                    ['step_number' => 8, 'title' => 'Verifikasi Kecamatan', 'description' => 'Memverifikasi dan validasi serta merekap hasil penilaian tingkat desa untuk diverifikasi tingkat kabupaten.'],
                    ['step_number' => 9, 'title' => 'Rekapitulasi Kabupaten', 'description' => 'Menerima hasil penilaian kelas kemampuan kelompok tani dari Koordinator BPP untuk diverifikasi tingkat kabupaten.'],
                    ['step_number' => 10, 'title' => 'Pemeriksaan Laporan Kabupaten', 'description' => 'Memeriksa laporan hasil penilaian kelas kelompoktani tingkat kabupaten dan memaraf laporan.'],
                    ['step_number' => 11, 'title' => 'Penetapan Hasil Penilaian', 'description' => 'Menelaah dan menetapkan hasil penilaian kelas kelompok tani tingkat kabupaten.'],
                    ['step_number' => 12, 'title' => 'Pengiriman Laporan ke Provinsi', 'description' => 'Menggandakan dan mengirimkan laporan kelas kelompok tani ke dinas provinsi dan membuat laporan per tahun.'],
                ],
            ],
            [
                'name' => 'Permohonan Bantuan Alat dan Mesin Pertanian',
                'description' => 'Pelayanan Permohonan Bantuan Alat dan Mesin Pertanian (Alsintan) meliputi kegiatan Sosialisasi dan Identifikasi Usulan bagi kelompok tani.',
                'duration' => '3 Bulan (60 Hari Kerja)',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Bantuan pemerintah (Alsintan) kepada kelompok tani',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 12 Tahun 1992 tentang Sistem Budidaya Tanaman; 2. PMK No. 168/PMK.05/2015; 3. Keputusan Permendagri No. 13 Tahun 2018.',
                'icon' => 'CogIcon',
                'sort_order' => 3,
                'requirements' => [
                    ['name' => 'Print Data SIMLUHTAN', 'description' => 'Bukti terdaftar aktif di SIMLUHTAN (print out resmi)', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Proposal Permohonan Bantuan Alsintan', 'description' => 'Proposal permohonan bantuan dari kelompok tani', 'is_required' => true, 'file_type' => 'pdf'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Usulan Proposal Alsintan', 'description' => 'Usulan Permohonan Proposal Bantuan Alsintan dari Kelompok Tani.'],
                    ['step_number' => 2, 'title' => 'Identifikasi Calon Lokasi & Petani', 'description' => 'Identifikasi calon Lokasi dan calon petani (CPCL).'],
                    ['step_number' => 3, 'title' => 'Instruksi SK Penerima', 'description' => 'Kepala Dinas memerintahkan untuk pembuatan SK Penerima manfaat Alat Mesin Pertanian.'],
                    ['step_number' => 4, 'title' => 'Penetapan SK Penerima', 'description' => 'Menetapkan SK penerima manfaat Alsintan.'],
                    ['step_number' => 5, 'title' => 'Pengetikan SK', 'description' => 'Memerintahkan staf untuk mengetik SK penetapan.'],
                    ['step_number' => 6, 'title' => 'Pemeriksaan SK', 'description' => 'Memeriksa SK Penerima manfaat Alsintan.'],
                    ['step_number' => 7, 'title' => 'Penandatanganan SK Penetapan', 'description' => 'Penandatanganan SK Penetapan oleh Kepala Dinas.'],
                    ['step_number' => 8, 'title' => 'Proses Pengadaan Alsintan', 'description' => 'Proses pengadaan unit Alsintan.'],
                    ['step_number' => 9, 'title' => 'Penyiapan Dokumen BAST & NPHD', 'description' => 'Penyiapan dokumen BAST (Berita Acara Serah Terima) dan NPHD bantuan.'],
                    ['step_number' => 10, 'title' => 'Pendistribusian Alsintan', 'description' => 'Pendistribusian unit Alsintan ke kelompok tani penerima.'],
                ],
            ],
            [
                'name' => 'Permohonan Bantuan Pupuk Bersubsidi',
                'description' => 'Pelayanan Permohonan Bantuan Pupuk Bersubsidi meliputi kegiatan Sosialisasi, Verifikasi, dan Validasi Data Pengusulan e-RDKK.',
                'duration' => '8 Hari Kerja',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Bantuan pemerintah kepada kelompok tani untuk bantuan pupuk subsidi',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 12 Tahun 1992; 2. PMK No. 168/PMK.05/2015; 3. Keputusan Permendagri No. 13 Tahun 2018.',
                'icon' => 'SparklesIcon',
                'sort_order' => 4,
                'requirements' => [
                    ['name' => 'SK Kelompok Tani', 'description' => 'Surat Keputusan penetapan/pembentukan kelompok tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Fotocopy KTP Anggota', 'description' => 'Scan/Fotocopy KTP seluruh anggota pengusul', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Fotocopy Kartu Keluarga', 'description' => 'Scan/Fotocopy Kartu Keluarga (KK)', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Surat Keterangan Kepemilikan Lahan', 'description' => 'Surat bukti kepemilikan/pengelolaan lahan pertanian (Maksimal 2 Ha per petani)', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Bukti Komoditas Yang Ditanam', 'description' => 'Keterangan menanam komoditas: Padi, Jagung, Ubi Kayu, Kedelai, Bawang Merah/Putih, Cabai, Kopi, Tebu, atau Kakao', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Instruksi Pembuatan SK Dinas', 'description' => 'Memerintahkan Kepala Bidang untuk membuat surat Keputusan Kepala Dinas.'],
                    ['step_number' => 2, 'title' => 'Instruksi SK Penginputan RDKK', 'description' => 'Memerintahkan Kepala Seksi membuat SK Penginputan Rencana Definitif Kebutuhan Kelompok Pupuk (RDKK) subsidi kepada koordinator BPP.'],
                    ['step_number' => 3, 'title' => 'Pembuatan SK Penginputan', 'description' => 'Melakukan pembuatan SK penginputan RDKK pupuk subsidi.'],
                    ['step_number' => 4, 'title' => 'Penetapan SK Petugas Penginput', 'description' => 'Menetapkan SK petugas penginput RDKK pupuk subsidi.'],
                    ['step_number' => 5, 'title' => 'Pengetikan SK', 'description' => 'Memerintahkan staf untuk mengetik SK.'],
                    ['step_number' => 6, 'title' => 'Pemeriksaan SK', 'description' => 'Memeriksa SK Petugas Penginput RDKK.'],
                    ['step_number' => 7, 'title' => 'Penandatanganan SK', 'description' => 'Penandatanganan SK Penetapan.'],
                    ['step_number' => 8, 'title' => 'Penginputan RDKK', 'description' => 'Pelaksanaan Penginputan RDKK oleh Petugas (Ketentuan: terdaftar SIMLUHTAN, max 2 ha lahan, komoditas sesuai aturan).'],
                ],
            ],
            [
                'name' => 'Permohonan Bantuan Sarana Produksi Tanaman Pangan',
                'description' => 'Pelayanan Permohonan Bantuan Sarana Produksi Tanaman Pangan / Bantuan Pemerintah untuk Masyarakat / Petani meliputi bantuan benih padi, dolomit, pupuk NPK, pupuk urea, dan insektisida.',
                'duration' => '1 Bulan (22 Hari Kerja)',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Bantuan Benih Padi, Dolomit, Pupuk NPK, Pupuk Urea, Insektisida dan Saprodi lainnya',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 25 Tahun 2009 tentang Pelayanan Publik; 2. UU No. 23 Tahun 2014; 3. PP No. 58 Tahun 2025; 4. Permentan No. 02 Tahun 2026.',
                'icon' => 'SunIcon',
                'sort_order' => 5,
                'requirements' => [
                    ['name' => 'Surat Permohonan dan Proposal', 'description' => 'Surat Permohonan dan Proposal dari Kelompok Tani/Gapoktan yang diketahui oleh PPL Desa dan Kepala Desa', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Bukti Terdaftar di SIMLUHTAN', 'description' => 'Bukti Kelompok Tani/Gapoktan telah terdaftar dalam SIMLUHTAN', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Fotokopi KTP Ketua Kelompok Tani', 'description' => 'Fotokopi/Scan KTP Ketua Kelompok Tani/Gapoktan', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Pengajuan Permohonan & Proposal', 'description' => 'Kelompok Tani/Gapoktan mengajukan permohonan kepada Kepala Dinas melampirkan proposal permohonan bantuan beserta kelengkapan berkas.'],
                    ['step_number' => 2, 'title' => 'Disposisi Berjenjang', 'description' => 'Surat Permohonan dan Proposal didisposisi secara berjenjang sampai ke Kepala Dinas.'],
                    ['step_number' => 3, 'title' => 'Verifikasi Lokasi & Kelompok', 'description' => 'Kepala Bidang Tanaman Pangan melakukan verifikasi terhadap Kelompok Tani/Gapoktan dan lokasi calon penerima bantuan yang didampingi oleh Penyuluh Pertanian Lapangan (PPL).'],
                    ['step_number' => 4, 'title' => 'Penetapan SK Penerima', 'description' => 'Berdasarkan hasil verifikasi, Kelompok Tani calon penerima bantuan akan ditetapkan melalui Surat Keputusan (SK) Kepala Dinas.'],
                    ['step_number' => 5, 'title' => 'Serah Terima Bantuan (BAST & NPHD)', 'description' => 'Bantuan diserahkan kepada Kelompok Tani/Gapoktan dengan melengkapi dokumen BAST (Berita Acara Serah Terima) dan NPHD (Naskah Perjanjian Hibah Daerah).'],
                ],
            ],
            [
                'name' => 'Permohonan Bantuan Pestisida',
                'description' => 'Pelayanan Permohonan Bantuan Pestisida / Bantuan Obat-Obatan untuk Pengendalian Organisme Pengganggu Tumbuhan (herbisida, insektisida, fungisida, moluskisida).',
                'duration' => '1 Minggu (7 Hari Kerja)',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Bantuan Pestisida untuk Pengendalian Organisme Pengganggu Tumbuhan',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, Petugas POPT, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 25 Tahun 2009; 2. Permentan No. 02 Tahun 2026; 3. Keputusan Menteri Pertanian No. 867/KPTS/OT/9/1997.',
                'icon' => 'ShieldExclamationIcon',
                'sort_order' => 6,
                'requirements' => [
                    ['name' => 'Laporan Peringatan Bahaya Serangan OPT', 'description' => 'Laporan Peringatan Bahaya yang diterbitkan Petugas POPT Kecamatan', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Fotocopy KTP Pemohon', 'description' => 'Fotocopy KTP Petani / Ketua Kelompok Tani / Gabungan Kelompok Tani', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Pelaporan Serangan OPT', 'description' => 'Petani/Kelompok Tani melaporkan adanya serangan OPT ke PPL Desa.'],
                    ['step_number' => 2, 'title' => 'Pemeriksaan Lapangan PPL & POPT', 'description' => 'PPL Desa bersama Petugas POPT Kecamatan memastikan jenis dan dampak serangan OPT.'],
                    ['step_number' => 3, 'title' => 'Penerbitan Laporan Bahaya', 'description' => 'Petugas POPT Kecamatan menerbitkan Laporan Peringatan Bahaya.'],
                    ['step_number' => 4, 'title' => 'Penerusan ke Koordinator Kabupaten', 'description' => 'Laporan Peringatan Bahaya diteruskan kepada koordinator POPT Kabupaten.'],
                    ['step_number' => 5, 'title' => 'Rekomendasi Jenis Pestisida', 'description' => 'Koordinator POPT Kabupaten menelaah dan merekomendasikan jenis pestisida yang dibutuhkan kepada Kabid & Kadis.'],
                    ['step_number' => 6, 'title' => 'Persetujuan Kepala Dinas', 'description' => 'Permohonan ditindaklanjuti setelah disetujui Kepala Dinas.'],
                    ['step_number' => 7, 'title' => 'Inventarisasi Stok Pestisida', 'description' => 'Koordinator POPT Kabupaten menginventarisir ketersediaan stok pestisida.'],
                    ['step_number' => 8, 'title' => 'Penyerahan Pestisida', 'description' => 'Koordinator POPT Kabupaten menyerahkan pestisida kepada Petani/Kelompok Tani melalui petugas POPT Kecamatan.'],
                ],
            ],
            [
                'name' => 'Permohonan Bantuan Sarana Produksi Hortikultura',
                'description' => 'Pelayanan Permohonan Bantuan Sarana Produksi Hortikultura meliputi bantuan benih, pupuk, pestisida, dan alsintan hortikultura.',
                'duration' => '3 Bulan (60 Hari Kerja)',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Bantuan Sarana Produksi Hortikultura',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, PPL, dan/atau melalui email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 25 Tahun 2009; 2. UU No. 23 Tahun 2014; 3. PP No. 58 Tahun 2025; 4. Permentan No. 02 Tahun 2026.',
                'icon' => 'HeartIcon',
                'sort_order' => 7,
                'requirements' => [
                    ['name' => 'Surat Permohonan Kelompok Tani', 'description' => 'Surat permohonan dari Kelompok Tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Proposal Bantuan Hortikultura', 'description' => 'Proposal yang ditujukan kepada Kepala Dinas Tanaman Pangan, Hortikultura, dan Ketahanan Pangan', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Surat Keterangan Status Lahan', 'description' => 'Surat keterangan status dan kepemilikan/pengelolaan lahan', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Surat Pernyataan Kesanggupan', 'description' => 'Surat pernyataan kesanggupan memelihara dan memanfaatkan bantuan dari Kelompok Tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Formulir Verifikasi Penyuluh', 'description' => 'Formulir verifikasi lapangan oleh Penyuluh Pertanian', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Foto Lokasi Geo-Tagging', 'description' => 'Foto dokumentasi lokasi lahan dengan titik koordinat / geo-tagging', 'is_required' => true, 'file_type' => 'jpg,png,pdf'],
                    ['name' => 'Fotokopi KTP Pengurus & Anggota', 'description' => 'Fotokopi KTP Ketua dan seluruh anggota Kelompok Tani', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Berita Acara Pembentukan Kelompok Tani', 'description' => 'Scan Berita Acara pembentukan Kelompok Tani', 'is_required' => true, 'file_type' => 'pdf'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Pengajuan Permohonan & Proposal', 'description' => 'Kelompok Tani mengajukan permohonan kepada Kepala Dinas melampirkan proposal dan kelengkapan berkas.'],
                    ['step_number' => 2, 'title' => 'Disposisi ke Kabid Hortikultura', 'description' => 'Proposal dan surat usulan didisposisikan kepada Kepala Bidang terkait.'],
                    ['step_number' => 3, 'title' => 'Verifikasi Lokasi & Kelompok', 'description' => 'Bidang terkait melakukan verifikasi terhadap Kelompok Tani dan lokasi calon penerima bantuan yang didampingi PPL.'],
                    ['step_number' => 4, 'title' => 'Penetapan SK Penerima Bantuan', 'description' => 'Berdasarkan hasil verifikasi, Kelompok Tani calon penerima bantuan ditetapkan melalui SK Kepala Dinas.'],
                    ['step_number' => 5, 'title' => 'Serah Terima Bantuan', 'description' => 'Pelaksanaan serah terima bantuan dilengkapi dengan BAST, NPHD, dan Pakta Integritas Kelompok.'],
                ],
            ],
            [
                'name' => 'Penyelenggaraan Pasar Murah',
                'description' => 'Pelayanan Penyelenggaraan Pasar Murah (Gerakan Pasar Murah) dengan menyediakan komoditas sembako di bawah harga pasaran untuk menjaga stabilisasi pasokan dan harga pangan.',
                'duration' => '1 Hari Kerja',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Gerakan Pasar Murah (Pelaksanaan Penjualan Sembako Murah)',
                'complaint_handling' => 'Disampaikan ke Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan dan/atau email: dtphkpkuansing@gmail.com',
                'legal_basis' => '1. UU No. 18 Tahun 2012 tentang Pangan; 2. PP No. 68 Tahun 2002 tentang Ketahanan Pangan; 3. Perda Kab. Kuantan Singingi.',
                'icon' => 'ShoppingBagIcon',
                'sort_order' => 8,
                'requirements' => [
                    ['name' => 'Ketentuan Pembatasan Pembelian', 'description' => 'Mematuhi batas jumlah pembelian sembako per kupon/orang saat pelaksanaan di lokasi GPM', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Sosialisasi GPM', 'description' => 'Mensosialisikan mengenai pelaksanaan GPM melalui media sosial dengan menyampaikan waktu, tempat dan item sembako yang disediakan.'],
                    ['step_number' => 2, 'title' => 'Pelaksanaan Gerakan Pasar Murah', 'description' => 'Melakukan pelayanan penjualan sembako murah pada hari dan lokasi yang sudah ditentukan.'],
                ],
            ],
            [
                'name' => 'Registrasi Izin Edar Pangan Segar Asal Tumbuhan Produksi Dalam Negeri Usaha Kecil/Mikro',
                'description' => 'Pelayanan Pemberian Rekomendasi Mutu dan Keamanan Pangan Segar Asal Tumbuhan (PSAT) Sertifikat Prima 3 untuk Usaha Kecil/Mikro di Kabupaten Kuantan Singingi.',
                'duration' => '3 Hari Kerja',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Rekomendasi Mutu dan Keamanan Pangan Segar Asal Tumbuhan (Sertifikat Prima 3)',
                'complaint_handling' => 'Surat resmi, Kotak Saran, atau Media Sosial Instagram @ketahananpangan.kuansing',
                'legal_basis' => '1. UU No. 18 Tahun 2012; 2. PP No. 86 Tahun 2019 tentang Keamanan Pangan; 3. Permentan No. 53/Permentan/Kr.040/12/2018.',
                'icon' => 'CheckBadgeIcon',
                'sort_order' => 9,
                'requirements' => [
                    ['name' => 'Berkas Permohonan Sertifikat Prima 3', 'description' => 'Pelaku usaha menyiapkan berkas permohonan untuk mendapatkan rekomendasi sertifikat prima 3', 'is_required' => true, 'file_type' => 'pdf'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Penyiapan Berkas Permohonan', 'description' => 'Pelaku usaha menyiapkan berkas permohonan untuk mendapatkan rekomendasi sertifikat prima 3.'],
                    ['step_number' => 2, 'title' => 'Disposisi Kadis ke Kabid', 'description' => 'Kepala dinas mendisposisikan surat permohonan untuk ditindaklanjuti oleh Kepala Bidang Ketahanan Pangan.'],
                    ['step_number' => 3, 'title' => 'Tindak Lanjut OKKPD Kabupaten', 'description' => 'Tim OKKPD Kabupaten menindaklanjuti surat permohonan.'],
                    ['step_number' => 4, 'title' => 'Verifikasi Permohonan', 'description' => 'Tim OKKPD Kabupaten melakukan verifikasi kelengkapan permohonan.'],
                    ['step_number' => 5, 'title' => 'Pengambilan Sampel Lapangan', 'description' => 'Tim OKKPD Provinsi melakukan pengambilan sampel pangan ke lapangan.'],
                    ['step_number' => 6, 'title' => 'Tindak Lanjut Hasil Laboratorium', 'description' => 'Kepala DTPHKP menginstruksikan Tim OKKPD Kabupaten untuk menindaklanjuti hasil uji laboratorium.'],
                    ['step_number' => 7, 'title' => 'Penerimaan Sertifikat Prima 3', 'description' => 'Pelaku usaha menerima hasil uji laboratorium dalam bentuk sertifikat prima 3.'],
                ],
            ],
            [
                'name' => 'Layanan Penerimaan Tamu',
                'description' => 'Pelayanan Penerimaan Tamu pada Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan Kabupaten Kuantan Singingi mencakup pencatatan identitas, verifikasi tujuan kunjungan, pengarahan ruang tunggu/pertemuan, dan registrasi.',
                'duration' => 'Maksimal 15 Menit',
                'cost' => 'Gratis / Tidak dipungut biaya',
                'product' => 'Pelayanan penerimaan tamu berupa registrasi tamu, pemberian informasi, fasilitasi pertemuan dengan pejabat/pegawai, dan pendampingan.',
                'complaint_handling' => 'Surat resmi, Kotak Saran, Instagram @ketahananpangan.kuansing, atau datang langsung ke petugas resepsionis/front office.',
                'legal_basis' => '1. UU No. 25 Tahun 2009; 2. Permendagri No. 52 Tahun 2011; 3. Perbup Kuantan Singingi No. 8 Tahun 2017 tentang SOP.',
                'icon' => 'IdentificationIcon',
                'sort_order' => 10,
                'requirements' => [
                    ['name' => 'Kedatangan Langsung Tamu', 'description' => 'Tamu datang langsung ke kantor Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan Kab. Kuantan Singingi', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Kartu Identitas Sah (KTP/SIM)', 'description' => 'Menunjukkan kartu identitas yang sah (KTP/SIM/Identitas lainnya) kepada petugas resepsionis', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                    ['name' => 'Buku Tamu / Daftar Kunjungan', 'description' => 'Mengisi buku tamu atau daftar kunjungan tamu', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Penyampaian Keperluan Kunjungan', 'description' => 'Menyampaikan tujuan dan keperluan kunjungan secara jelas', 'is_required' => true, 'file_type' => 'pdf'],
                    ['name' => 'Penggunaan Visitor Pass', 'description' => 'Menggunakan visitor pass yang diberikan petugas selama berada di lingkungan kantor', 'is_required' => true, 'file_type' => 'pdf,jpg,png'],
                ],
                'procedures' => [
                    ['step_number' => 1, 'title' => 'Penyambutan Budaya 5S', 'description' => 'Tamu datang dan disambut oleh petugas resepsionis dengan menerapkan budaya pelayanan 5S (Senyum, Salam, Sapa, Sopan, dan Santun).'],
                    ['step_number' => 2, 'title' => 'Pemeriksaan Identitas & Maksud', 'description' => 'Petugas resepsionis menanyakan maksud dan tujuan kunjungan serta meminta tamu menunjukkan kartu identitas yang berlaku.'],
                    ['step_number' => 3, 'title' => 'Pengisian Buku Tamu', 'description' => 'Tamu mengisi buku tamu atau sistem registrasi tamu sesuai ketentuan.'],
                    ['step_number' => 4, 'title' => 'Pemberian Visitor Pass', 'description' => 'Petugas resepsionis memberikan visitor pass kepada tamu dan mempersilakan menunggu di ruang tunggu.'],
                    ['step_number' => 5, 'title' => 'Konfirmasi ke Pejabat/Pegawai', 'description' => 'Petugas resepsionis menghubungi pimpinan atau pegawai yang akan ditemui untuk mengonfirmasi kehadiran tamu.'],
                    ['step_number' => 6, 'title' => 'Pengantaran ke Ruang Pertemuan', 'description' => 'Setelah mendapat persetujuan, petugas mengarahkan atau mengantarkan tamu menuju ruang pertemuan/ruang kerja.'],
                    ['step_number' => 7, 'title' => 'Pelayanan Pertemuan', 'description' => 'Pimpinan atau pegawai menerima tamu dan memberikan pelayanan sesuai dengan maksud kunjungan.'],
                    ['step_number' => 8, 'title' => 'Pengembalian Visitor Pass', 'description' => 'Setelah pelayanan selesai, tamu mengembalikan visitor pass kepada petugas resepsionis.'],
                ],
            ],
        ];

        foreach ($services as $serviceData) {
            $requirements = $serviceData['requirements'];
            $procedures = $serviceData['procedures'];
            unset($serviceData['requirements'], $serviceData['procedures']);

            $serviceData['slug'] = Str::slug($serviceData['name']);
            $service = Service::updateOrCreate(['slug' => $serviceData['slug']], $serviceData);

            // Seed requirements
            foreach ($requirements as $reqIndex => $req) {
                ServiceRequirement::updateOrCreate(
                    [
                        'service_id' => $service->id,
                        'name'       => $req['name'],
                    ],
                    [
                        'description' => $req['description'],
                        'is_required' => $req['is_required'],
                        'file_type'   => $req['file_type'],
                        'sort_order'  => $reqIndex + 1,
                    ]
                );
            }

            // Seed procedures
            foreach ($procedures as $proc) {
                ServiceProcedure::updateOrCreate(
                    [
                        'service_id'  => $service->id,
                        'step_number' => $proc['step_number'],
                    ],
                    [
                        'title'       => $proc['title'],
                        'description' => $proc['description'],
                    ]
                );
            }
        }
    }
}
