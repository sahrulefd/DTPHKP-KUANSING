<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel service_requirements — Persyaratan per layanan.
 *
 * Dipisah dari tabel services untuk normalisasi 1NF (menghilangkan repeating group).
 * Setiap layanan bisa memiliki banyak persyaratan, masing-masing bisa required/optional.
 *
 * CASCADE delete: jika service di-force-delete, persyaratannya ikut terhapus.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_required')->default(true);
            $table->string('file_type', 50)->nullable()->comment('Format file: pdf,jpg,png');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            // Index untuk lookup persyaratan per layanan
            $table->index('service_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_requirements');
    }
};
