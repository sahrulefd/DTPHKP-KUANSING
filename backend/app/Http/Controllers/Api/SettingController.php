<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Public: Get public settings (contact, dinas info, survey links).
     */
    public function index(): JsonResponse
    {
        $settings = Setting::all()->pluck('value', 'key');

        return response()->json([
            'data' => $settings,
        ]);
    }

    /**
     * Admin: Update settings key-value store.
     */
    public function update(Request $request): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }

        return response()->json([
            'message' => 'Pengaturan berhasil disimpan.',
            'data'    => Setting::all()->pluck('value', 'key'),
        ]);
    }
}
