<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'tracking_number'  => $this->tracking_number,
            'status'           => $this->status,
            'notes'            => $this->notes,
            'rejection_reason' => $this->rejection_reason,
            'user'             => new UserResource($this->whenLoaded('user')),
            'service'          => new ServiceResource($this->whenLoaded('service')),
            'verified_by'      => new UserResource($this->whenLoaded('verifier')),
            'verified_at'      => $this->verified_at?->toISOString(),
            'completed_at'     => $this->completed_at?->toISOString(),
            'rating'             => $this->rating,
            'feedback'           => $this->feedback,
            'output_letter_file' => $this->output_letter_file,
            'output_letter_url'  => $this->output_letter_file ? asset('storage/' . $this->output_letter_file) : null,
            'created_at'         => $this->created_at?->toISOString(),
            'updated_at'       => $this->updated_at?->toISOString(),
            'documents'        => $this->whenLoaded('documents', function () {
                return $this->documents->map(fn ($doc) => [
                    'id'                => $doc->id,
                    'file_name'         => $doc->file_name,
                    'file_path'         => asset('storage/' . $doc->file_path),
                    'file_type'         => $doc->file_type,
                    'requirement_name'  => $doc->serviceRequirement?->name ?? 'Dokumen Pendukung',
                ]);
            }),
        ];
    }
}
