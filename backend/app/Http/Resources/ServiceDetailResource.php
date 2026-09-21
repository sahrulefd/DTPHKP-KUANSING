<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            'slug'               => $this->slug,
            'description'        => $this->description,
            'duration'           => $this->duration,
            'cost'               => $this->cost,
            'product'            => $this->product,
            'complaint_handling' => $this->complaint_handling,
            'legal_basis'        => $this->legal_basis,
            'icon'               => $this->icon,
            'is_active'          => $this->is_active,
            'sort_order'         => $this->sort_order,
            'requirements'       => $this->requirements->map(fn ($req) => [
                'id'          => $req->id,
                'name'        => $req->name,
                'description' => $req->description,
                'is_required' => $req->is_required,
                'file_type'   => $req->file_type,
                'sort_order'  => $req->sort_order,
            ]),
            'procedures'         => $this->procedures->map(fn ($proc) => [
                'id'          => $proc->id,
                'step_number' => $proc->step_number,
                'title'       => $proc->title,
                'description' => $proc->description,
            ]),
        ];
    }
}
