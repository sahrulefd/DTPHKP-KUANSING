<?php

namespace Database\Seeders;

use App\Models\Guide;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GuideSeeder extends Seeder
{
    public function run(): void
    {
        Guide::query()->forceDelete();

        $guides = [
            [
                'title' => 'Panduan Pendaftaran Akun Masyarakat',
                'content' => "## Langkah-langkah Mendaftar Akun Pemohon:\n1. Akses halaman utama website **DTPHKP Kabupaten Kuantan Singingi** dan klik tombol **Register** di sudut kanan atas.\n2. Isi formulir pendaftaran akun dengan data diri Anda secara lengkap dan akurat:\n   - **Nama Lengkap**: Isikan nama sesuai dengan KTP Anda.\n   - **NIK (16 Digit)**: Masukkan Nomor Induk Kependudukan yang valid.\n   - **Nomor Telepon / WhatsApp**: Masukkan nomor aktif untuk menerima notifikasi status pengajuan.\n   - **Alamat Lengkap**: Isikan alamat domisili atau tempat tinggal Anda.\n   - **Email**: Masukkan alamat email yang aktif.\n   - **Kata Sandi (Password)**: Buat kata sandi minimal 8 karakter yang aman.\n3. Pastikan seluruh data NIK, email, dan nomor HP sudah diperiksa dengan teliti.\n4. Klik tombol **Daftar** untuk memproses registrasi akun.\n5. Setelah berhasil, Anda akan otomatis masuk ke **Dashboard Pelayanan Masyarakat**.\n\n![Formulir Registrasi Akun Pemohon](/panduan/Registrasi.png)",
                'sort_order' => 1,
            ],
            [
                'title' => 'Panduan Login ke Portal Pelayanan',
                'content' => "## Langkah-langkah Login / Masuk ke Sistem:\n1. Buka halaman utama website DTPHKP dan klik tombol **Login / Masuk**.\n2. Masukkan **NIK atau Alamat Email** terdaftar pada kolom **NIK / Email**.\n3. Masukkan **Kata Sandi (Password)** akun Anda dengan benar.\n4. Klik tombol **Masuk Sekarang** untuk mengakses halaman Dashboard Pemohon.\n5. Jika Anda mengalami kendala masuk, gunakan fitur pendaftaran ulang atau hubungi layanan bantuan DTPHKP.\n\n![Halaman Login Masuk Akun Pemohon](/panduan/Login.png)",
                'sort_order' => 2,
            ],
            [
                'title' => 'Panduan Pengelolaan Profil & Data Diri',
                'content' => "## Langkah-langkah Mengelola Profil Akun:\n1. Setelah berhasil login, klik menu **Profil Saya** di bagian navigasi atas atau menu samping.\n2. Periksa kelengkapan dan kebenaran data identitas Anda (**NIK**, **Nama Lengkap**, **Nomor HP/WA**, dan **Alamat**).\n3. Apabila terjadi perubahan nomor telepon WhatsApp atau alamat domisili, perbarui data pada kolom formulir profil.\n4. Klik tombol **Simpan Perubahan** untuk menyimpan perbaruan data akun Anda.\n\n![Halaman Pengaturan Profil Pemohon](/panduan/profil.png)",
                'sort_order' => 3,
            ],
            [
                'title' => 'Panduan Navigasi & Fitur Dashboard',
                'content' => "## Memahami Tampilan & Fitur Dashboard Pemohon:\n1. Setelah login, Anda akan disambut oleh halaman **Dashboard Utama Pelayanan**.\n2. Perhatikan kartu ringkasan status permohonan:\n   - **Total Pengajuan**: Menampilkan jumlah keseluruhan permohonan layanan yang telah Anda buat.\n   - **Sedang Diproses**: Menampilkan permohonan berkas yang sedang dalam tahap verifikasi atau proses dinas.\n   - **Selesai**: Menampilkan permohonan yang telah selesai dan dokumen resminya terbit.\n3. Gunakan tombol pintasan **Ajukan Layanan Baru** untuk membuat permohonan layanan secara cepat.\n4. Akses daftar **Aktivitas Terakhir** untuk melihat perkembangan pengajuan permohonan Anda.\n\n![Tampilan Dashboard Utama Pemohon DTPHKP](/panduan/Dashboard.png)",
                'sort_order' => 4,
            ],
            [
                'title' => 'Panduan Memilih Jenis Layanan Online',
                'content' => "## Langkah-langkah Memilih Layanan Publik DTPHKP:\n1. Buka menu **Daftar Layanan** pada navigasi utama portal DTPHKP.\n2. Jelajahi katalog pelayanan publik yang tersedia di bidang Tanaman Pangan, Hortikultura, dan Peternakan.\n3. Pilih jenis permohonan layanan yang Anda butuhkan, kemudian klik tombol **Detail Layanan**.\n4. Pelajari informasi detail mengenai **Deskripsi Layanan**, **Waktu Penyelesaian**, **Biaya (Gratis/Rp 0)**, serta **Dokumen Persyaratan Wajib**.\n5. Klik tombol **Ajukan Layanan Ini** untuk memulai prosedur permohonan online.\n\n![Katalog dan Form Pemilihan Jenis Layanan](/panduan/Pilih Jenis Layanan.png)",
                'sort_order' => 5,
            ],
            [
                'title' => 'Panduan Pengisian Form & Unggah Berkas Persyaratan',
                'content' => "## Langkah-langkah Pengisian Formulir & Unggah Dokumen:\n1. Isikan **Catatan / Keterangan Tambahan** permohonan jika diperlukan oleh dinas.\n2. Cermati daftar **Dokumen Persyaratan** yang ditagihkan pada halaman formulir.\n3. Klik tombol **Pilih File / Upload** pada masing-masing item dokumen persyaratan.\n4. Unggah berkas dalam format **PDF, JPG, atau PNG** dengan batas ukuran maksimal **5 MB** per berkas.\n5. Pastikan dokumen yang diunggah jelas, terbaca, dan tidak buram/terpotong.\n6. Periksa status berkas hingga muncul indikator **Terunggah / File Berhasil Diupload**.\n\n![Halaman Pengisian Form dan Unggah Persyaratan](/panduan/Unggah Persyaratan.png)",
                'sort_order' => 6,
            ],
            [
                'title' => 'Panduan Konfirmasi & Submit Pengajuan',
                'content' => "## Langkah-langkah Mengirim & Finalisasi Permohonan:\n1. Lakukan peninjauan akhir (review) atas seluruh formulir dan lampiran dokumen persyaratan.\n2. Pastikan data yang dimasukkan serta berkas yang diunggah sudah lengkap dan benar.\n3. Klik tombol **Submit Pengajuan** / **Kirim Permohonan**.\n4. Setelah berhasil, sistem akan secara otomatis mengarahkan Anda ke **Halaman Detail Pengajuan** di Dashboard Akun Anda.\n5. Pengajuan Anda telah resmi tercatat di dalam sistem dan dapat langsung dipantau melalui menu **Riwayat Pengajuan**.\n\n![Konfirmasi Pengajuan & Detail Pengajuan](/panduan/Submit Pengajuan.png)",
                'sort_order' => 7,
            ],
            [
                'title' => 'Panduan Melacak Status & Mengunduh Hasil Layanan',
                'content' => "## Langkah-langkah Memantau Status & Mengunduh Dokumen Hasil:\n1. Buka menu **Riwayat Pengajuan** pada Dashboard Akun Pemohon.\n2. Cari pengajuan permohonan Anda, lalu klik tombol **Detail Pengajuan**.\n3. Pantau kronologi status pengajuan Anda:\n   - **Menunggu Verifikasi**: Berkas baru masuk dan antre untuk diperiksa verifikator dinas.\n   - **Diproses / Diverifikasi**: Berkas memenuhi syarat dan sedang diproses oleh bidang terkait.\n   - **Perlu Perbaikan / Ditolak**: Berkas tidak sesuai (alasan penolakan / catatan revisi dapat dibaca di kolom detail).\n   - **Selesai**: Permohonan disetujui dan dokumen resmi telah diterbitkan.\n4. Apabila status **Selesai**, klik tombol **Unduh Dokumen Hasil / Sertifikat** untuk menyimpan file surat resmi ber-stempel/QR-code.\n\n![Halaman Riwayat Pengajuan & Status Dokumen](/panduan/Riwayat Pengajuan.png)",
                'sort_order' => 8,
            ],
        ];

        foreach ($guides as $guide) {
            $guide['slug'] = Str::slug($guide['title']);
            Guide::updateOrCreate(
                ['slug' => $guide['slug']],
                $guide
            );
        }
    }
}


