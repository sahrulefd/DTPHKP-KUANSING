<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $name = fake()->unique()->sentence(3);
        return [
            'name'               => $name,
            'slug'               => Str::slug($name),
            'description'        => fake()->paragraph(),
            'duration'           => '3 Hari Kerja',
            'cost'               => 'Gratis',
            'product'            => fake()->sentence(),
            'complaint_handling' => fake()->paragraph(),
            'legal_basis'        => fake()->sentence(),
            'icon'               => 'DocumentTextIcon',
            'is_active'          => true,
            'sort_order'         => fake()->numberBetween(1, 20),
        ];
    }
}
