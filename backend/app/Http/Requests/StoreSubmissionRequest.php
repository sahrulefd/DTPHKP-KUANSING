<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'service_id'    => ['required', 'exists:services,id'],
            'notes'         => ['nullable', 'string', 'max:1000'],
            'documents'     => ['required', 'array'],
            'documents.*.requirement_id' => ['required', 'exists:service_requirements,id'],
            'documents.*.file'           => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'], // 5MB max
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required'           => 'Layanan wajib dipilih.',
            'service_id.exists'             => 'Layanan yang dipilih tidak valid.',
            'documents.required'            => 'Dokumen persyaratan wajib diunggah.',
            'documents.*.file.required'     => 'File dokumen wajib diunggah.',
            'documents.*.file.mimes'        => 'Format dokumen harus berupa PDF, JPG, JPEG, atau PNG.',
            'documents.*.file.max'          => 'Ukuran file dokumen maksimal 5 MB.',
        ];
    }
}
