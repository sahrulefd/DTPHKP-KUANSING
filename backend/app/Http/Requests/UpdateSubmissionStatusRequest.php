<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubmissionStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'status'             => ['required', Rule::in(['menunggu_verifikasi', 'diproses', 'ditolak', 'selesai'])],
            'admin_notes'        => ['nullable', 'string', 'max:1000'],
            'rejection_reason'   => ['required_if:status,ditolak', 'nullable', 'string', 'max:1000'],
            'output_letter_file' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'status.required'              => 'Status wajib dipilih.',
            'status.in'                    => 'Status tidak valid.',
            'rejection_reason.required_if' => 'Alasan penolakan wajib diisi jika status ditolak.',
            'output_letter_file.file'      => 'File surat resmi harus berupa dokumen atau gambar.',
            'output_letter_file.mimes'     => 'Format surat resmi harus PDF, JPG, PNG, DOC, atau DOCX.',
            'output_letter_file.max'       => 'Ukuran file surat resmi tidak boleh melebihi 10MB.',
        ];
    }
}
