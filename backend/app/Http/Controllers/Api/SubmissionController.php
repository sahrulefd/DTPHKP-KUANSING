<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubmissionRequest;
use App\Http\Requests\UpdateSubmissionStatusRequest;
use App\Http\Resources\SubmissionDetailResource;
use App\Http\Resources\SubmissionResource;
use App\Models\Submission;
use App\Models\SubmissionDocument;
use App\Services\SubmissionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function __construct(
        protected SubmissionService $submissionService
    ) {}

    /**
     * Public / Masyarakat: Track submission by tracking number without login.
     */
    public function track(string $trackingNumber): JsonResponse
    {
        $submission = Submission::where('tracking_number', $trackingNumber)
            ->with(['service', 'statusHistories.changedBy'])
            ->firstOrFail();

        return response()->json([
            'data' => [
                'tracking_number'  => $submission->tracking_number,
                'service_name'     => $submission->service->name,
                'status'           => $submission->status,
                'rejection_reason' => $submission->rejection_reason,
                'created_at'       => $submission->created_at->toISOString(),
                'status_histories' => $submission->statusHistories->map(fn ($h) => [
                    'previous_status' => $h->previous_status,
                    'new_status'      => $h->new_status,
                    'notes'           => $h->notes,
                    'created_at'      => $h->created_at->toISOString(),
                ]),
            ],
        ]);
    }

    /**
     * Masyarakat: List current user's submissions.
     * Admin: List all submissions (with optional status/search filters).
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $query = Submission::query()->with(['user', 'service', 'verifier', 'documents']);

        if ($user->isMasyarakat()) {
            $query->byUser($user->id);
        }

        if ($request->has('status') && !empty($request->input('status'))) {
            $query->status($request->input('status'));
        }

        if ($request->has('search') && !empty($request->input('search'))) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('tracking_number', 'like', "%{$search}%")
                  ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")->orWhere('nik', 'like', "%{$search}%"))
                  ->orWhereHas('service', fn ($s) => $s->where('name', 'like', "%{$search}%"));
            });
        }

        $submissions = $query->latest()->paginate($request->input('per_page', 15));

        return response()->json([
            'data' => SubmissionResource::collection($submissions),
            'meta' => [
                'current_page' => $submissions->currentPage(),
                'last_page'    => $submissions->lastPage(),
                'per_page'     => $submissions->perPage(),
                'total'        => $submissions->total(),
            ],
        ]);
    }

    /**
     * Show detailed submission info.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user = $request->user();
        $query = Submission::where('id', $id)
            ->with(['user', 'service.requirements', 'service.procedures', 'verifier', 'documents.serviceRequirement', 'statusHistories.changedBy']);

        if ($user->isMasyarakat()) {
            $query->byUser($user->id);
        }

        $submission = $query->firstOrFail();

        return response()->json([
            'data' => new SubmissionDetailResource($submission),
        ]);
    }

    /**
     * Masyarakat: Store new submission.
     */
    public function store(StoreSubmissionRequest $request): JsonResponse
    {
        $submission = $this->submissionService->createSubmission(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'Pengajuan layanan berhasil dikirim.',
            'data'    => new SubmissionDetailResource($submission),
        ], 201);
    }

    /**
     * Admin: Update submission status (Approve, Reject, Complete).
     */
    public function updateStatus(UpdateSubmissionStatusRequest $request, int $id): JsonResponse
    {
        $submission = Submission::findOrFail($id);

        $updatedSubmission = $this->submissionService->updateStatus(
            $submission,
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'Status pengajuan berhasil diperbarui.',
            'data'    => new SubmissionDetailResource($updatedSubmission),
        ]);
    }

    /**
     * Admin: Toggle document checklist verification.
     */
    public function toggleDocumentVerification(Request $request, int $submissionId, int $documentId): JsonResponse
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $document = SubmissionDocument::where('submission_id', $submissionId)
            ->where('id', $documentId)
            ->firstOrFail();

        $isVerified = $request->boolean('is_verified');
        $updatedDocument = $this->submissionService->toggleDocumentVerification($document, $isVerified);

        return response()->json([
            'message' => 'Status verifikasi dokumen diperbarui.',
            'data'    => [
                'id'          => $updatedDocument->id,
                'is_verified' => $updatedDocument->is_verified,
            ],
        ]);
    }

    /**
     * Masyarakat: Batalkan pengajuan yang masih dalam status menunggu.
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        $submission = Submission::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($submission->status !== 'menunggu_verifikasi') {
            return response()->json(['message' => 'Pengajuan ini tidak dapat dibatalkan karena sedang diproses atau sudah selesai.'], 422);
        }

        $submission->delete();

        return response()->json([
            'message' => 'Pengajuan berhasil dibatalkan.',
        ]);
    }

    /**
     * Masyarakat: Beri rating (1-5) dan ulasan untuk pengajuan yang selesai.
     */
    public function rateSubmission(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'rating'   => 'required|integer|min:1|max:5',
            'feedback' => 'nullable|string|max:1000',
        ]);

        $user = $request->user();
        $submission = Submission::find($id);

        if (!$submission) {
            return response()->json([
                'message' => 'Pengajuan tidak ditemukan.',
            ], 404);
        }

        if ($user->role !== 'admin' && $submission->user_id !== $user->id) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk memberikan penilaian pada pengajuan ini.',
            ], 403);
        }

        if ($submission->status !== 'selesai') {
            return response()->json([
                'message' => 'Penilaian hanya dapat diberikan pada pengajuan yang telah selesai.',
            ], 422);
        }

        $submission->update([
            'rating'   => (int) $request->input('rating'),
            'feedback' => $request->input('feedback'),
        ]);

        return response()->json([
            'message' => 'Terima kasih! Penilaian dan ulasan Anda telah berhasil disimpan.',
            'data'    => [
                'rating'   => $submission->rating,
                'feedback' => $submission->feedback,
            ],
        ]);
    }

    /**
     * Public: Verifikasi keaslian dokumen resmi berdasarkan nomor tracking.
     */
    public function verifyDocument(string $trackingNumber): JsonResponse
    {
        $submission = Submission::where('tracking_number', $trackingNumber)
            ->with(['user', 'service', 'verifier'])
            ->firstOrFail();

        return response()->json([
            'data' => [
                'tracking_number'  => $submission->tracking_number,
                'service_name'     => $submission->service->name,
                'applicant_name'   => $submission->user->name,
                'applicant_nik'    => substr($submission->user->nik ?? '', 0, 6) . '******' . substr($submission->user->nik ?? '', -4),
                'status'           => $submission->status,
                'completed_at'     => $submission->completed_at ? $submission->completed_at->toISOString() : $submission->updated_at->toISOString(),
                'verifier_name'    => $submission->verifier ? $submission->verifier->name : 'Sistem / Admin DTPHKP',
                'is_valid'         => $submission->status === 'selesai',
            ],
        ]);
    }
}
