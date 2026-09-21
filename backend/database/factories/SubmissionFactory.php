<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubmissionFactory extends Factory
{
    protected $model = Submission::class;

    public function definition(): array
    {
        return [
            'tracking_number' => Submission::generateTrackingNumber(),
            'user_id'         => User::factory(),
            'service_id'      => Service::factory(),
            'status'          => fake()->randomElement(['menunggu_verifikasi', 'diproses', 'ditolak', 'selesai']),
            'notes'           => fake()->sentence(),
            'admin_notes'     => null,
            'rejection_reason'=> null,
            'verified_by'     => null,
            'verified_at'     => null,
            'completed_at'    => null,
        ];
    }
}
