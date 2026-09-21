<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'max:255'],
            'nik'     => ['required', 'string', 'size:16', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone'   => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'    => 'Nama lengkap wajib diisi.',
            'nik.required'     => 'NIK wajib diisi.',
            'nik.size'         => 'NIK harus berjumlah 16 digit.',
            'nik.unique'       => 'NIK sudah terdaftar pada akun lain.',
            'phone.required'   => 'Nomor telepon wajib diisi.',
            'address.required' => 'Alamat lengkap wajib diisi.',
        ];
    }
}
