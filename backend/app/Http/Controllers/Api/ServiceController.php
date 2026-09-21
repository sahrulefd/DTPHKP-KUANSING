<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Resources\ServiceDetailResource;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Models\ServiceProcedure;
use App\Models\ServiceRequirement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Public / Masyarakat: List all active services.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()->withCount('requirements');

        if ($request->boolean('all') && $request->user()?->isAdmin()) {
            // Admin can view inactive services if ?all=true
        } else {
            $query->active();
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $services = $query->ordered()->get();

        return response()->json([
            'data' => ServiceResource::collection($services),
        ]);
    }

    /**
     * Public / Masyarakat: Get service detail by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)
            ->with(['requirements', 'procedures'])
            ->firstOrFail();

        return response()->json([
            'data' => new ServiceDetailResource($service),
        ]);
    }

    /**
     * Admin: Create new service with requirements & procedures.
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        $service = DB::transaction(function () use ($request) {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['name']);

            $service = Service::create($data);

            if (isset($data['requirements']) && is_array($data['requirements'])) {
                foreach ($data['requirements'] as $reqIndex => $req) {
                    ServiceRequirement::create([
                        'service_id'  => $service->id,
                        'name'        => $req['name'],
                        'description' => $req['description'] ?? null,
                        'is_required' => $req['is_required'] ?? true,
                        'file_type'   => $req['file_type'] ?? 'pdf,jpg,png',
                        'sort_order'  => $reqIndex + 1,
                    ]);
                }
            }

            if (isset($data['procedures']) && is_array($data['procedures'])) {
                foreach ($data['procedures'] as $proc) {
                    ServiceProcedure::create([
                        'service_id'  => $service->id,
                        'step_number' => $proc['step_number'],
                        'title'       => $proc['title'],
                        'description' => $proc['description'] ?? null,
                    ]);
                }
            }

            return $service;
        });

        return response()->json([
            'message' => 'Layanan berhasil ditambahkan.',
            'data'    => new ServiceDetailResource($service->load(['requirements', 'procedures'])),
        ], 201);
    }

    /**
     * Admin: Update service.
     */
    public function update(StoreServiceRequest $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        DB::transaction(function () use ($service, $request) {
            $data = $request->validated();
            if ($service->name !== $data['name']) {
                $data['slug'] = Str::slug($data['name']);
            }

            $service->update($data);

            // Re-sync requirements if provided
            if (isset($data['requirements'])) {
                $service->requirements()->delete();
                foreach ($data['requirements'] as $reqIndex => $req) {
                    ServiceRequirement::create([
                        'service_id'  => $service->id,
                        'name'        => $req['name'],
                        'description' => $req['description'] ?? null,
                        'is_required' => $req['is_required'] ?? true,
                        'file_type'   => $req['file_type'] ?? 'pdf,jpg,png',
                        'sort_order'  => $reqIndex + 1,
                    ]);
                }
            }

            // Re-sync procedures if provided
            if (isset($data['procedures'])) {
                $service->procedures()->delete();
                foreach ($data['procedures'] as $proc) {
                    ServiceProcedure::create([
                        'service_id'  => $service->id,
                        'step_number' => $proc['step_number'],
                        'title'       => $proc['title'],
                        'description' => $proc['description'] ?? null,
                    ]);
                }
            }
        });

        return response()->json([
            'message' => 'Layanan berhasil diperbarui.',
            'data'    => new ServiceDetailResource($service->load(['requirements', 'procedures'])),
        ]);
    }

    /**
     * Admin: Delete service.
     */
    public function destroy(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Layanan berhasil dihapus.',
        ]);
    }
}
