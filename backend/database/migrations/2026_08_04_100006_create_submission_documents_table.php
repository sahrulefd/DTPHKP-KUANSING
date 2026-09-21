<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel submission_documents — File dokumen persyaratan yang di-upload.
 *
 * Menghubungkan pengajuan (submissions) dengan persyaratan (service_requirements).
 * Setiap dokumen terkait dengan 1 persyaratan spesifik.
 *
 * is_verified memungkinkan admin melakukan checklist per dokumen.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('submissions')->cascadeOnDelete();
            $table->foreignId('service_requirement_id')->constrained('service_requirements')->restrictOnDelete();
            $table->string('file_name');
            $table->string('file_path', 500);
            $table->string('file_type', 50)->comment('MIME type');
            $table->unsignedBigInteger('file_size')->comment('Ukuran dalam bytes');
            $table->boolean('is_verified')->default(false)->comment('Checklist admin');
            $table->timestamps();

            // Indexes
            $table->index('submission_id');
            $table->index('service_requirement_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_documents');
    }
};
