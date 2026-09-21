<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model ServiceProcedure — Langkah prosedur per layanan.
 *
 * Relationships:
 * - service(): BelongsTo → Service
 */
class ServiceProcedure extends Model
{
    protected $fillable = [
        'service_id',
        'step_number',
        'title',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'step_number' => 'integer',
        ];
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Layanan pemilik prosedur ini.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
