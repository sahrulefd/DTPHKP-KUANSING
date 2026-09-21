<?php

namespace App\Services;

use App\Models\Service;
use App\Models\Submission;
use App\Models\User;

/**
 * Service Layer — Dashboard Statistics Calculations
 */
class DashboardService
{
    /**
     * Dashboard stats for Admin.
     */
    public function getAdminStats(): array
    {
        $totalSubmissions = Submission::count();
        $menungguVerifikasi = Submission::where('status', 'menunggu_verifikasi')->count();
        $diproses = Submission::where('status', 'diproses')->count();
        $ditolak = Submission::where('status', 'ditolak')->count();
        $selesai = Submission::where('status', 'selesai')->count();

        $totalServices = Service::where('is_active', true)->count();
        $totalMasyarakat = User::where('role', 'masyarakat')->count();

        $recentSubmissions = Submission::with(['user', 'service'])
            ->latest()
            ->take(5)
            ->get();

        $avgRating = round(Submission::whereNotNull('rating')->avg('rating') ?? 0, 1);
        $totalRatings = Submission::whereNotNull('rating')->count();

        return [
            'total_submissions'    => $totalSubmissions,
            'menunggu_verifikasi'  => $menungguVerifikasi,
            'diproses'             => $diproses,
            'ditolak'              => $ditolak,
            'selesai'              => $selesai,
            'avg_rating'           => $avgRating,
            'total_ratings'        => $totalRatings,
            'total_services'       => $totalServices,
            'total_masyarakat'     => $totalMasyarakat,
            'recent_submissions'   => $recentSubmissions,
        ];
    }

    /**
     * Dashboard stats for Masyarakat user.
     */
    public function getUserStats(User $user): array
    {
        $totalSubmissions = Submission::where('user_id', $user->id)->count();
        $menungguVerifikasi = Submission::where('user_id', $user->id)->where('status', 'menunggu_verifikasi')->count();
        $diproses = Submission::where('user_id', $user->id)->where('status', 'diproses')->count();
        $ditolak = Submission::where('user_id', $user->id)->where('status', 'ditolak')->count();
        $selesai = Submission::where('user_id', $user->id)->where('status', 'selesai')->count();

        $recentSubmissions = Submission::where('user_id', $user->id)
            ->with(['service'])
            ->latest()
            ->take(5)
            ->get();

        return [
            'total_submissions'   => $totalSubmissions,
            'menunggu_verifikasi' => $menungguVerifikasi,
            'diproses'            => $diproses,
            'ditolak'             => $ditolak,
            'selesai'             => $selesai,
            'recent_submissions'  => $recentSubmissions,
        ];
    }
}
