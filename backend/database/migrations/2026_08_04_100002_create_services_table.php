<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel services — Master data layanan publik.
 *
 * Menyimpan 10 layanan DTPHKP beserta informasi lengkap:
 * deskripsi, jangka waktu, biaya, produk, pengaduan, dan dasar hukum.
 *
 * Soft delete diaktifkan agar layanan yang dihapus tidak menghilangkan
 * relasi ke pengajuan yang sudah ada.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('duration', 100);
            $table->string('cost', 100)->default('Tidak Dipungut Biaya');
            $table->text('product');
            $table->text('complaint_handling');
            $table->text('legal_basis');
            $table->string('icon', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Index untuk query publik
            $table->index('is_active');
            $table->index('sort_order');
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
