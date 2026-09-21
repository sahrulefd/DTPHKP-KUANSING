<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Admin: Generate report of submissions filtered by date range and status.
     */
    public function index(Request $request): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $query = Submission::query()->with(['user', 'service']);

        if ($request->has('start_date') && !empty($request->input('start_date'))) {
            $query->whereDate('created_at', '>=', $request->input('start_date'));
        }

        if ($request->has('end_date') && !empty($request->input('end_date'))) {
            $query->whereDate('created_at', '<=', $request->input('end_date'));
        }

        if ($request->has('service_id') && !empty($request->input('service_id'))) {
            $query->where('service_id', $request->input('service_id'));
        }

        if ($request->has('status') && !empty($request->input('status'))) {
            $query->where('status', $request->input('status'));
        }

        $submissions = $query->latest()->get();

        // Summary stats for the report
        $summary = [
            'total'               => $submissions->count(),
            'menunggu_verifikasi' => $submissions->where('status', 'menunggu_verifikasi')->count(),
            'diproses'            => $submissions->where('status', 'diproses')->count(),
            'ditolak'             => $submissions->where('status', 'ditolak')->count(),
            'selesai'             => $submissions->where('status', 'selesai')->count(),
            'avg_rating'          => round($submissions->whereNotNull('rating')->avg('rating') ?? 0, 1),
            'total_ratings'       => $submissions->whereNotNull('rating')->count(),
        ];

        return response()->json([
            'data'    => $submissions->map(fn ($sub) => [
                'id'              => $sub->id,
                'tracking_number' => $sub->tracking_number,
                'applicant_name'  => $sub->user->name,
                'applicant_nik'   => $sub->user->nik,
                'service_name'    => $sub->service->name,
                'status'          => $sub->status,
                'rating'          => $sub->rating,
                'feedback'        => $sub->feedback,
                'created_at'      => $sub->created_at->format('Y-m-d H:i:s'),
                'completed_at'    => $sub->completed_at?->format('Y-m-d H:i:s'),
            ]),
            'summary' => $summary,
        ]);
    }
}
