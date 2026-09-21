<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model SubmissionDocument — File dokumen persyaratan yang di-upload.
 *
 * Relationships:
 * - submission(): BelongsTo → Submission
 * - serviceRequirement(): BelongsTo → ServiceRequirement
 */
class SubmissionDocument extends Model
{
    protected $fillable = [
        'submission_id',
        'service_requirement_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
            'is_verified' => 'boolean',
        ];
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Pengajuan pemilik dokumen ini.
     */
    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }

    /**
     * Persyaratan yang dipenuhi oleh dokumen ini.
     */
    public function serviceRequirement(): BelongsTo
    {
        return $this->belongsTo(ServiceRequirement::class);
    }
}
