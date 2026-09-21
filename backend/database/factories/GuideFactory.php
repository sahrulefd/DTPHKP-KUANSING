<?php

namespace Database\Factories;

use App\Models\Guide;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GuideFactory extends Factory
{
    protected $model = Guide::class;

    public function definition(): array
    {
        $title = fake()->sentence(4);
        return [
            'title'      => $title,
            'slug'       => Str::slug($title),
            'content'    => fake()->paragraphs(3, true),
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active'  => true,
        ];
    }
}
