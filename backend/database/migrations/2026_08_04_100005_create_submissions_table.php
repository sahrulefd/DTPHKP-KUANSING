<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel submissions — Data pengajuan layanan dari masyarakat.
 *
 * Tabel transaksional utama sistem. Menyimpan setiap pengajuan beserta:
 * - Tracking number untuk pelacakan publik
 * - Status (4 nilai enum)
 * - Catatan masyarakat dan admin
 * - Alasan penolakan (denormalisasi disengaja untuk performa)
 * - Info verifikator (siapa admin yang memverifikasi)
 *
 * Soft delete untuk menjaga integritas data pemerintahan.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number', 30)->unique();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('service_id')->constrained('services')->restrictOnDelete();
            $table->enum('status', [
                'menunggu_verifikasi',
                'diproses',
                'ditolak',
                'selesai',
            ])->default('menunggu_verifikasi');
            $table->text('notes')->nullable()->comment('Catatan dari masyarakat');
            $table->text('admin_notes')->nullable()->comment('Catatan internal admin');
            $table->text('rejection_reason')->nullable()->comment('Alasan penolakan');
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->unsignedTinyInteger('rating')->nullable()->comment('Rating kepuasan pemohon 1-5');
            $table->text('feedback')->nullable()->comment('Ulasan/umpan balik pemohon');
            $table->timestamps();
            $table->softDeletes();

            // Indexes untuk query yang sering dilakukan
            $table->index('user_id');
            $table->index('service_id');
            $table->index('status');
            $table->index('verified_by');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
