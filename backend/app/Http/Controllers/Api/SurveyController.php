<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /**
     * Publik: Simpan hasil Penilaian Cepat / Survei SKM.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'             => 'nullable|string|max:255',
            'service_category' => 'required|string|max:255',
            'rating'           => 'required|integer|min:1|max:5',
            'feedback'         => 'nullable|string|max:2000',
        ]);

        $survey = Survey::create([
            'name'             => $validated['name'] ?? null,
            'service_category' => $validated['service_category'],
            'rating'           => (int) $validated['rating'],
            'feedback'         => $validated['feedback'] ?? null,
        ]);

        return response()->json([
            'message' => 'Terima kasih atas penilaian dan ulasan masukan Anda!',
            'data'    => $survey,
        ], 201);
    }

    /**
     * Admin: Ambil daftar masukan survei publik beserta statistik IKM.
     */
    public function index(Request $request): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $query = Survey::query();

        if ($request->has('category') && !empty($request->input('category'))) {
            $query->where('service_category', $request->input('category'));
        }

        if ($request->has('rating') && !empty($request->input('rating'))) {
            $query->where('rating', $request->input('rating'));
        }

        $surveys = $query->latest()->get();

        $summary = [
            'total'         => $surveys->count(),
            'avg_rating'    => round($surveys->avg('rating') ?? 0, 1),
            'five_stars'    => $surveys->where('rating', 5)->count(),
            'four_stars'    => $surveys->where('rating', 4)->count(),
            'three_stars'   => $surveys->where('rating', 3)->count(),
            'two_stars'     => $surveys->where('rating', 2)->count(),
            'one_star'      => $surveys->where('rating', 1)->count(),
        ];

        return response()->json([
            'data'    => $surveys,
            'summary' => $summary,
        ]);
    }

    /**
     * Admin: Hapus satu entri data survei publik.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $survey = Survey::find($id);

        if (!$survey) {
            return response()->json(['message' => 'Data survei tidak ditemukan.'], 404);
        }

        $survey->delete();

        return response()->json([
            'message' => 'Data survei berhasil dihapus.',
        ]);
    }
}
