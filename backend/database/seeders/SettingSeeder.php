<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'DTPHKP Pelayanan', 'group' => 'general'],
            ['key' => 'site_title', 'value' => 'Sistem Informasi Pelayanan dan Administrasi — DTPHKP Kuansing', 'group' => 'general'],
            ['key' => 'dinas_name', 'value' => 'Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan', 'group' => 'general'],
            ['key' => 'regency_name', 'value' => 'Kabupaten Kuantan Singingi', 'group' => 'general'],
            ['key' => 'sk_number', 'value' => 'Keputusan Kepala Dinas No. 605 Tahun 2025 tentang Standar Pelayanan Publik', 'group' => 'general'],
            ['key' => 'head_of_dinas', 'value' => 'DEFLIDES GUSNI, SP., M.Si (NIP. 19691231 200003 1 026)', 'group' => 'general'],

            // Contact (Official from SK SP 2025 PDF)
            ['key' => 'office_address', 'value' => 'Komplek Perkantoran Pemerintah Daerah Kabupaten Kuantan Singingi, Teluk Kuantan, Riau', 'group' => 'contact'],
            ['key' => 'office_phone', 'value' => '0823 7980 9018', 'group' => 'contact'],
            ['key' => 'office_email', 'value' => 'dtphkpkuansing@gmail.com', 'group' => 'contact'],
            ['key' => 'office_instagram', 'value' => '@ketahananpangan.kuansing', 'group' => 'contact'],
            ['key' => 'office_hours', 'value' => 'Senin - Jumat: 08.00 - 16.00 WIB', 'group' => 'contact'],
            ['key' => 'maps_embed', 'value' => 'https://maps.google.com/maps?q=FGVR%2B245%2C+Sungai+Jering%2C+Kec.+Kuantan+Tengah%2C+Kabupaten+Kuantan+Singingi%2C+Riau+29566&t=&z=16&ie=UTF8&iwloc=&output=embed', 'group' => 'contact'],

            // Survey (SKM)
            ['key' => 'survey_url', 'value' => 'https://skm.go.id/share/instansi/d1bd6598-706b-4c79-9e8c-0463a3834be0/1', 'group' => 'survey'],
            ['key' => 'survey_title', 'value' => 'Survei Kepuasan Masyarakat (SKM)', 'group' => 'survey'],
            ['key' => 'survey_description', 'value' => 'Bantu kami meningkatkan kualitas pelayanan publik DTPHKP Kabupaten Kuantan Singingi dengan mengisi Survei Kepuasan Masyarakat.', 'group' => 'survey'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
