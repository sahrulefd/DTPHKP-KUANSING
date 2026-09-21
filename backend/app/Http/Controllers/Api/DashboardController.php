<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    public function stats(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $stats = $this->dashboardService->getAdminStats();
        } else {
            $stats = $this->dashboardService->getUserStats($user);
        }

        return response()->json([
            'data' => $stats,
        ]);
    }
}
