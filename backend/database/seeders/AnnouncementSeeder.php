<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AnnouncementSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $announcements = [
            [
                'title' => 'Peluncuran Portal Pelayanan Publik Digital DTPHKP Kabupaten Kuantan Singingi',
                'excerpt' => 'Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan resmi meluncurkan portal pelayanan publik online untuk mempermudah permohonan layanan petani.',
                'content' => 'Teluk Kuantan — Dalam rangka meningkatkan efisiensi dan transparansi pelayanan publik, Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan (DTPHKP) Kabupaten Kuantan Singingi secara resmi meluncurkan portal pelayanan online. Masyarakat dan kelompok tani kini dapat mengajukan pendaftaran kelompok tani, permohonan bantuan alsintan, pupuk bersubsidi, dan perizinan PSAT secara digital dari mana saja.',
                'is_published' => true,
                'published_at' => now(),
            ],
            [
                'title' => 'Sosialisasi Pendaftaran Usulan e-RDKK Pupuk Bersubsidi Tahun Ajaran Baru',
                'excerpt' => 'Dinas mengimbau seluruh Pengurus Kelompok Tani untuk segera memperbarui data anggota dan usulan kebutuhan pupuk bersubsidi.',
                'content' => 'DTPHKP Kuantan Singingi mengingatkan seluruh ketua kelompok tani di wilayah Kuantan Singingi untuk melakukan pembaruan data e-RDKK pupuk bersubsidi. Pengajuan usulan dapat dilakukan secara mandiri atau didampingi PPL setempat melalui sistem online pelayanan dinas.',
                'is_published' => true,
                'published_at' => now()->subDays(3),
            ],
        ];

        foreach ($announcements as $ann) {
            $ann['slug'] = Str::slug($ann['title']);
            $ann['author_id'] = $admin ? $admin->id : null;
            Announcement::updateOrCreate(
                ['slug' => $ann['slug']],
                $ann
            );
        }
    }
}
