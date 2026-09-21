<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Faq::query();

        if (!$request->user()?->isAdmin()) {
            $query->active();
        }

        if ($request->has('category') && !empty($request->input('category'))) {
            $query->byCategory($request->input('category'));
        }

        $faqs = $query->ordered()->get();

        return response()->json([
            'data' => FaqResource::collection($faqs),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $validated = $request->validate([
            'question'   => ['required', 'string', 'max:500'],
            'answer'     => ['required', 'string'],
            'category'   => ['nullable', 'string', 'max:100'],
            'sort_order' => ['integer', 'min:0'],
            'is_active'  => ['boolean'],
        ]);

        $faq = Faq::create($validated);

        return response()->json([
            'message' => 'FAQ berhasil ditambahkan.',
            'data'    => new FaqResource($faq),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $faq = Faq::findOrFail($id);
        $validated = $request->validate([
            'question'   => ['required', 'string', 'max:500'],
            'answer'     => ['required', 'string'],
            'category'   => ['nullable', 'string', 'max:100'],
            'sort_order' => ['integer', 'min:0'],
            'is_active'  => ['boolean'],
        ]);

        $faq->update($validated);

        return response()->json([
            'message' => 'FAQ berhasil diperbarui.',
            'data'    => new FaqResource($faq),
        ]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        if (!$request->user()?->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json([
            'message' => 'FAQ berhasil dihapus.',
        ]);
    }
}
