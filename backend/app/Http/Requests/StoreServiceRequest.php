<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'name'               => ['required', 'string', 'max:255'],
            'description'        => ['required', 'string'],
            'duration'           => ['required', 'string', 'max:100'],
            'cost'               => ['required', 'string', 'max:100'],
            'product'            => ['required', 'string'],
            'complaint_handling' => ['required', 'string'],
            'legal_basis'        => ['required', 'string'],
            'icon'               => ['nullable', 'string', 'max:100'],
            'is_active'          => ['boolean'],
            'sort_order'         => ['integer', 'min:0'],
            'requirements'       => ['nullable', 'array'],
            'requirements.*.name'        => ['required', 'string', 'max:255'],
            'requirements.*.description' => ['nullable', 'string'],
            'requirements.*.is_required' => ['boolean'],
            'requirements.*.file_type'   => ['nullable', 'string', 'max:50'],
            'procedures'         => ['nullable', 'array'],
            'procedures.*.step_number'   => ['required', 'integer', 'min:1'],
            'procedures.*.title'         => ['required', 'string', 'max:255'],
            'procedures.*.description'   => ['nullable', 'string'],
        ];
    }
}
