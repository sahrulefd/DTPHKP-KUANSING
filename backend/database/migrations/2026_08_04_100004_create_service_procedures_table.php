<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel service_procedures — Langkah-langkah prosedur/mekanisme pelayanan.
 *
 * Dipisah dari services untuk normalisasi 1NF.
 * Setiap layanan memiliki beberapa langkah prosedur berurutan.
 *
 * step_number digunakan untuk urutan langkah (bukan sort_order)
 * karena secara semantik ini adalah nomor langkah prosedur.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_procedures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->unsignedInteger('step_number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamps();

            // Index untuk lookup prosedur per layanan
            $table->index('service_id');

            // Compound unique: satu layanan tidak boleh punya nomor langkah duplikat
            $table->unique(['service_id', 'step_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_procedures');
    }
};
