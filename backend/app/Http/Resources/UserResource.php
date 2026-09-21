<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'nik'        => $this->nik,
            'email'      => $this->email,
            'phone'      => $this->phone,
            'address'    => $this->address,
            'role'       => $this->role,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
