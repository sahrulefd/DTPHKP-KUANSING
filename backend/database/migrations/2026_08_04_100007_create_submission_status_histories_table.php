<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel submission_status_histories — Audit trail perubahan status.
 *
 * Mencatat setiap perubahan status pengajuan:
 * - Dari status apa ke status apa
 * - Siapa yang mengubah
 * - Kapan diubah
 * - Catatan/alasan perubahan
 *
 * Penting untuk akuntabilitas sistem pemerintahan.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions')->cascadeOnDelete();
            $table->string('previous_status', 30)->nullable()->comment('Null saat pertama kali submit');
            $table->string('new_status', 30);
            $table->text('notes')->nullable()->comment('Catatan/alasan perubahan');
            $table->foreignId('changed_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();

            // Indexes
            $table->index('submission_id');
            $table->index('new_status');
            $table->index('changed_by');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_status_histories');
    }
};
