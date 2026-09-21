<?php

namespace App\Models;

use Database\Factories\SubmissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model Submission — Pengajuan layanan dari masyarakat.
 *
 * Tabel transaksional utama. Menyimpan setiap pengajuan beserta
 * status, catatan, alasan penolakan, dan info verifikator.
 *
 * Relationships:
 * - user(): BelongsTo → User (pemohon)
 * - service(): BelongsTo → Service (layanan yang diajukan)
 * - verifier(): BelongsTo → User (admin yang memverifikasi)
 * - documents(): HasMany → SubmissionDocument
 * - statusHistories(): HasMany → SubmissionStatusHistory
 */
class Submission extends Model
{
    /** @use HasFactory<SubmissionFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'tracking_number',
        'user_id',
        'service_id',
        'status',
        'notes',
        'admin_notes',
        'rejection_reason',
        'verified_by',
        'verified_at',
        'completed_at',
        'rating',
        'feedback',
        'output_letter_file',
    ];

    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    // ==========================================
    // BOOT
    // ==========================================

    protected static function boot()
    {
        parent::boot();

        // Auto-generate tracking number saat creating
        static::creating(function ($submission) {
            if (empty($submission->tracking_number)) {
                $submission->tracking_number = self::generateTrackingNumber();
            }
        });
    }

    /**
     * Generate tracking number unik: SUB-YYYYMMDD-XXXX
     */
    public static function generateTrackingNumber(): string
    {
        $date = now()->format('Ymd');
        $prefix = "SUB-{$date}-";

        // Cari nomor urut terakhir hari ini
        $lastSubmission = self::withTrashed()
            ->where('tracking_number', 'like', $prefix . '%')
            ->orderBy('tracking_number', 'desc')
            ->first();

        if ($lastSubmission) {
            $lastNumber = (int) substr($lastSubmission->tracking_number, -4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * User (masyarakat) yang mengajukan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Layanan yang diajukan.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Admin yang memverifikasi.
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Dokumen yang di-upload.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(SubmissionDocument::class);
    }

    /**
     * Riwayat perubahan status.
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(SubmissionStatusHistory::class)->orderBy('created_at');
    }

    // ==========================================
    // SCOPES
    // ==========================================

    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    // ==========================================
    // HELPERS
    // ==========================================

    public function isMenungguVerifikasi(): bool
    {
        return $this->status === 'menunggu_verifikasi';
    }

    public function isDiproses(): bool
    {
        return $this->status === 'diproses';
    }

    public function isDitolak(): bool
    {
        return $this->status === 'ditolak';
    }

    public function isSelesai(): bool
    {
        return $this->status === 'selesai';
    }
}
