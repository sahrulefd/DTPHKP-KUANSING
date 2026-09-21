<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambahkan field profil ke tabel users.
 *
 * Field yang ditambahkan:
 * - nik: NIK 16 digit (CHAR untuk fixed-length, lebih efisien)
 * - phone: Nomor telepon
 * - address: Alamat lengkap
 * - role: admin atau masyarakat (default: masyarakat)
 * - deleted_at: Soft delete
 *
 * Dibuat sebagai migration terpisah agar migration users bawaan Laravel tetap utuh.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->char('nik', 16)->unique()->after('name');
            $table->string('phone', 20)->nullable()->after('email');
            $table->text('address')->nullable()->after('phone');
            $table->enum('role', ['admin', 'masyarakat'])->default('masyarakat')->after('address');
            $table->softDeletes();

            // Index untuk query berdasarkan role
            $table->index('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropIndex(['role']);
            $table->dropColumn(['nik', 'phone', 'address', 'role']);
        });
    }
};
