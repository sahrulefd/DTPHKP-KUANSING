<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Model ServiceRequirement — Persyaratan per layanan.
 *
 * Relationships:
 * - service(): BelongsTo → Service
 * - documents(): HasMany → SubmissionDocument
 */
class ServiceRequirement extends Model
{
    protected $fillable = [
        'service_id',
        'name',
        'description',
        'is_required',
        'file_type',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Layanan pemilik persyaratan ini.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Dokumen yang di-upload untuk memenuhi persyaratan ini.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(SubmissionDocument::class);
    }
}
