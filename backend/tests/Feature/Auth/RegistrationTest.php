<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name'                  => 'Test User',
            'nik'                   => '1409012345678901',
            'email'                 => 'test@example.com',
            'phone'                 => '081234567890',
            'address'               => 'Jl. Sudirman No. 12',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $this->assertAuthenticated();
        $response->assertStatus(201);
    }

    public function test_nik_must_be_unique(): void
    {
        User::factory()->create([
            'nik' => '1409012345678901',
        ]);

        $response = $this->postJson('/api/register', [
            'name'                  => 'Another User',
            'nik'                   => '1409012345678901',
            'email'                 => 'another@example.com',
            'phone'                 => '081234567891',
            'address'               => 'Jl. Riau No. 5',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['nik']);
    }
}
