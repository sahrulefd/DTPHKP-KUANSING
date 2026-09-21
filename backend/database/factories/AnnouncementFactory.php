<?php

namespace Database\Factories;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AnnouncementFactory extends Factory
{
    protected $model = Announcement::class;

    public function definition(): array
    {
        $title = fake()->sentence(6);
        return [
            'title'        => $title,
            'slug'         => Str::slug($title),
            'content'      => fake()->paragraphs(4, true),
            'excerpt'      => fake()->sentence(15),
            'image'        => null,
            'author_id'    => User::factory()->admin(),
            'is_published' => true,
            'published_at' => now(),
        ];
    }
}
