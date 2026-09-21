<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Bagaimana cara mengajukan pelayanan publik di DTPHKP Kuantan Singingi secara online?',
                'answer' => 'Anda dapat mendaftar akun terlebih dahulu melalui menu "Register". Setelah mempunyai akun, silakan "Login", pilih jenis layanan yang Anda butuhkan pada menu "Daftar Layanan", baca persyaratan dan mekanismenya, lalu klik tombol "Ajukan Layanan" untuk mengisi formulir dan mengunggah dokumen persyaratan.',
                'category' => 'Umum',
                'sort_order' => 1,
            ],
            [
                'question' => 'Apakah pengajuan layanan secara online dikenakan biaya?',
                'answer' => 'Seluruh pelayanan publik di Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan Kabupaten Kuantan Singingi TIDAK DIPUNGUT BIAYA (Gratis). Jika ada oknum yang meminta imbalan, silakan laporkan melalui kanal pengaduan resmi kami.',
                'category' => 'Umum',
                'sort_order' => 2,
            ],
            [
                'question' => 'Format file apa saja yang diperbolehkan untuk diunggah?',
                'answer' => 'Format file dokumen yang diterima sistem adalah PDF, JPG, JPEG, dan PNG dengan ukuran maksimal 5 MB per file.',
                'category' => 'Teknis',
                'sort_order' => 3,
            ],
            [
                'question' => 'Bagaimana cara memantau/mengecek status pengajuan saya?',
                'answer' => 'Anda dapat masuk ke Dashboard Masyarakat dan memilih menu "Riwayat Pengajuan". Di sana Anda dapat melihat status pengajuan terkini (Menunggu Verifikasi, Diproses, Ditolak, atau Selesai) beserta timeline riwayat perubahannya.',
                'category' => 'Layanan',
                'sort_order' => 4,
            ],
            [
                'question' => 'Apa yang harus dilakukan jika pengajuan saya ditolak?',
                'answer' => 'Jika pengajuan ditolak, sistem akan menampilkan alasan penolakan yang diinputkan oleh Admin (misalnya berkas tidak terbaca atau kurang). Anda dapat memperbaiki/melengkapi dokumen tersebut dan mengajukan permohonan baru.',
                'category' => 'Layanan',
                'sort_order' => 5,
            ],
            [
                'question' => 'Berapa lama waktu proses verifikasi pengajuan?',
                'answer' => 'Waktu verifikasi berkas oleh admin berkisar antara 1 hingga 3 hari kerja tergantung jenis layanan yang diajukan.',
                'category' => 'Layanan',
                'sort_order' => 6,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['question' => $faq['question']],
                $faq
            );
        }
    }
}
