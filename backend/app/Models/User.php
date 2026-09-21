<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Model User — Pengguna sistem (admin dan masyarakat).
 *
 * Relationships:
 * - submissions(): HasMany → Submission (pengajuan yang dibuat)
 * - verifiedSubmissions(): HasMany → Submission (pengajuan yang diverifikasi, khusus admin)
 * - statusHistories(): HasMany → SubmissionStatusHistory (perubahan status yang dilakukan)
 * - announcements(): HasMany → Announcement (berita yang dibuat, khusus admin)
 *
 * Scopes:
 * - admin(): Query scope untuk filter admin
 * - masyarakat(): Query scope untuk filter masyarakat
 */
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'nik',
        'email',
        'phone',
        'address',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Pengajuan yang dibuat oleh user ini.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    /**
     * Pengajuan yang diverifikasi oleh admin ini.
     */
    public function verifiedSubmissions(): HasMany
    {
        return $this->hasMany(Submission::class, 'verified_by');
    }

    /**
     * Riwayat perubahan status yang dilakukan oleh user ini.
     */
    public function statusHistories(): HasMany
    {
        return $this->hasMany(SubmissionStatusHistory::class, 'changed_by');
    }

    /**
     * Berita yang dibuat oleh admin ini.
     */
    public function announcements(): HasMany
    {
        return $this->hasMany(Announcement::class, 'author_id');
    }

    // ==========================================
    // SCOPES
    // ==========================================

    /**
     * Scope: hanya admin.
     */
    public function scopeAdmin($query)
    {
        return $query->where('role', 'admin');
    }

    /**
     * Scope: hanya masyarakat.
     */
    public function scopeMasyarakat($query)
    {
        return $query->where('role', 'masyarakat');
    }

    // ==========================================
    // HELPERS
    // ==========================================

    /**
     * Cek apakah user adalah admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Cek apakah user adalah masyarakat.
     */
    public function isMasyarakat(): bool
    {
        return $this->role === 'masyarakat';
    }
}
