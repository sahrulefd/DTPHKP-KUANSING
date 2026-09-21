<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin Default
        User::updateOrCreate(
            ['email' => 'admin@dtphkp.kuansing.go.id'],
            [
                'name'     => 'Administrator DTPHKP',
                'nik'      => '1409010101010001',
                'phone'    => '081234567890',
                'address'  => 'Dinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan, Teluk Kuantan',
                'role'     => 'admin',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Sample Masyarakat Users
        $masyarakatData = [
            [
                'name'    => 'Budi Santoso',
                'nik'     => '1409011508850001',
                'email'   => 'budi@gmail.com',
                'phone'   => '085271829304',
                'address' => 'Desa Koto Taluk, Kec. Kuantan Tengah, Kab. Kuantan Singingi',
            ],
            [
                'name'    => 'Siti Aminah',
                'nik'     => '1409022010900002',
                'email'   => 'siti@gmail.com',
                'phone'   => '081365498721',
                'address' => 'Desa Siderojo, Kec. Singingi, Kab. Kuantan Singingi',
            ],
            [
                'name'    => 'Ahmad Dahlan',
                'nik'     => '1409031204780003',
                'email'   => 'ahmad@gmail.com',
                'phone'   => '082198765432',
                'address' => 'Desa Muara Lembu, Kec. Singingi, Kab. Kuantan Singingi',
            ],
        ];

        foreach ($masyarakatData as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                array_merge($data, [
                    'role'     => 'masyarakat',
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ])
            );
        }
    }
}
