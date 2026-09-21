<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * Model Service — Master data layanan publik.
 *
 * Relationships:
 * - requirements(): HasMany → ServiceRequirement
 * - procedures(): HasMany → ServiceProcedure (ordered by step_number)
 * - submissions(): HasMany → Submission
 *
 * Auto-generate slug dari nama layanan saat creating.
 */
class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'duration',
        'cost',
        'product',
        'complaint_handling',
        'legal_basis',
        'icon',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    // ==========================================
    // BOOT
    // ==========================================

    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug saat creating jika belum diisi
        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->name);
            }
        });
    }

    // ==========================================
    // RELATIONSHIPS
    // ==========================================

    /**
     * Persyaratan layanan ini (ordered by sort_order).
     */
    public function requirements(): HasMany
    {
        return $this->hasMany(ServiceRequirement::class)->orderBy('sort_order');
    }

    /**
     * Langkah prosedur layanan ini (ordered by step_number).
     */
    public function procedures(): HasMany
    {
        return $this->hasMany(ServiceProcedure::class)->orderBy('step_number');
    }

    /**
     * Pengajuan untuk layanan ini.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    // ==========================================
    // SCOPES
    // ==========================================

    /**
     * Scope: hanya layanan aktif.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: urut berdasarkan sort_order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    // ==========================================
    // ROUTE MODEL BINDING
    // ==========================================

    /**
     * Get the route key for the model (gunakan slug untuk URL).
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
