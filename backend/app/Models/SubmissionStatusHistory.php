<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model SubmissionStatusHistory — Audit trail perubahan status.
 *
 * Relationships:
 * - submission(): BelongsTo → Submission
 * - changedBy(): BelongsTo → User (yang mengubah status)
 */
class SubmissionStatusHistory extends Model
{
    protected $fillable = [
        'submission_id',
        'previous_status',
        'new_status',
        'notes',
        'changed_by',
    ];

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Pengajuan yang statusnya berubah.
     */
    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }

    /**
     * User yang mengubah status.
     */
    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
