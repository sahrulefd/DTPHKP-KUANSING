<?php

namespace App\Services;

use App\Models\Submission;
use App\Models\SubmissionDocument;
use App\Models\SubmissionStatusHistory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * Service Layer — Submission Processing Logic
 */
class SubmissionService
{
    /**
     * Create a new submission with documents and initial status history.
     */
    public function createSubmission(User $user, array $data): Submission
    {
        return DB::transaction(function () use ($user, $data) {
            $submission = Submission::create([
                'user_id'    => $user->id,
                'service_id' => $data['service_id'],
                'status'     => 'menunggu_verifikasi',
                'notes'      => $data['notes'] ?? null,
            ]);

            // Save documents
            if (isset($data['documents']) && is_array($data['documents'])) {
                foreach ($data['documents'] as $docData) {
                    if (isset($docData['file']) && $docData['file'] instanceof UploadedFile) {
                        /** @var UploadedFile $file */
                        $file = $docData['file'];
                        $path = $file->store('submissions/' . $submission->id, 'public');

                        SubmissionDocument::create([
                            'submission_id'          => $submission->id,
                            'service_requirement_id' => $docData['requirement_id'],
                            'file_name'              => $file->getClientOriginalName(),
                            'file_path'              => $path,
                            'file_type'              => $file->getClientMimeType(),
                            'file_size'              => $file->getSize(),
                            'is_verified'            => false,
                        ]);
                    }
                }
            }

            // Create initial status history entry
            SubmissionStatusHistory::create([
                'submission_id'   => $submission->id,
                'previous_status' => null,
                'new_status'      => 'menunggu_verifikasi',
                'notes'           => 'Pengajuan dibuat oleh masyarakat.',
                'changed_by'      => $user->id,
            ]);

            return $submission->load(['service', 'documents.serviceRequirement', 'statusHistories']);
        });
    }

    /**
     * Update submission status (Admin verification/approval/rejection/completion).
     */
    public function updateStatus(Submission $submission, User $admin, array $data): Submission
    {
        return DB::transaction(function () use ($submission, $admin, $data) {
            $oldStatus = $submission->status;
            $newStatus = $data['status'];

            $updateFields = [
                'status' => $newStatus,
            ];

            if (isset($data['admin_notes'])) {
                $updateFields['admin_notes'] = $data['admin_notes'];
            }

            if ($newStatus === 'ditolak') {
                $updateFields['rejection_reason'] = $data['rejection_reason'] ?? $data['admin_notes'] ?? 'Pengajuan ditolak.';
            } else {
                $updateFields['rejection_reason'] = null;
            }

            if (in_array($newStatus, ['diproses', 'ditolak', 'selesai'])) {
                $updateFields['verified_by'] = $admin->id;
                $updateFields['verified_at'] = now();
            }

            if (isset($data['output_letter_file']) && $data['output_letter_file'] instanceof UploadedFile) {
                if ($submission->output_letter_file && Storage::disk('public')->exists($submission->output_letter_file)) {
                    Storage::disk('public')->delete($submission->output_letter_file);
                }
                $updateFields['output_letter_file'] = $data['output_letter_file']->store('output_letters', 'public');
            }

            $submission->update($updateFields);

            // Record status history
            SubmissionStatusHistory::create([
                'submission_id'   => $submission->id,
                'previous_status' => $oldStatus,
                'new_status'      => $newStatus,
                'notes'           => $data['rejection_reason'] ?? $data['admin_notes'] ?? 'Status diubah ke ' . $newStatus,
                'changed_by'      => $admin->id,
            ]);

            $updated = $submission->load(['user', 'service', 'verifier', 'documents', 'statusHistories']);

            // Kirim Notifikasi WA/Email
            try {
                \App\Services\NotificationService::sendStatusNotification($updated);
            } catch (\Throwable $e) {
                // Log error silently if notification fails
            }

            return $updated;
        });
    }

    /**
     * Toggle document verification status (Checklist per document by Admin).
     */
    public function toggleDocumentVerification(SubmissionDocument $document, bool $isVerified): SubmissionDocument
    {
        $document->update(['is_verified' => $isVerified]);
        return $document;
    }
}
