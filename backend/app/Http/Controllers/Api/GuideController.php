<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuideResource;
use App\Models\Guide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GuideController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Guide::query();

        if (!$request->user()?->isAdmin()) {
            $query->active();
        }

        $guides = $query->ordered()->get();

        return response()->json([
            'data' => GuideResource::collection($guides),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $guide = Guide::where('slug', $slug)->active()->firstOrFail();

        return response()->json([
            'data' => new GuideResource($guide),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'title'      => ['required', 'string', 'max:255'],
            'content'    => ['required', 'string'],
            'sort_order' => ['integer', 'min:0'],
            'is_active'  => ['boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $guide = Guide::create($validated);

        return response()->json([
            'message' => 'Panduan berhasil ditambahkan.',
            'data'    => new GuideResource($guide),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $guide = Guide::findOrFail($id);
        $validated = $request->validate([
            'title'      => ['required', 'string', 'max:255'],
            'content'    => ['required', 'string'],
            'sort_order' => ['integer', 'min:0'],
            'is_active'  => ['boolean'],
        ]);

        if ($guide->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $guide->update($validated);

        return response()->json([
            'message' => 'Panduan berhasil diperbarui.',
            'data'    => new GuideResource($guide),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $guide = Guide::findOrFail($id);
        $guide->delete();

        return response()->json([
            'message' => 'Panduan berhasil dihapus.',
        ]);
    }
}
