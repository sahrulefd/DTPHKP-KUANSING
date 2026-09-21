<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminResetPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_reset_user_password(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $user = User::factory()->create([
            'role'     => 'masyarakat',
            'password' => Hash::make('oldpassword123'),
        ]);

        $response = $this->actingAs($admin)
            ->putJson("/api/admin/users/{$user->id}/reset-password", [
                'password'              => 'newsecret123',
                'password_confirmation' => 'newsecret123',
            ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => "Kata sandi untuk pengguna '{$user->name}' berhasil di-reset.",
        ]);

        $user->refresh();
        $this->assertTrue(Hash::check('newsecret123', $user->password));
    }

    public function test_non_admin_cannot_reset_user_password(): void
    {
        $masyarakat = User::factory()->create([
            'role' => 'masyarakat',
        ]);

        $targetUser = User::factory()->create([
            'role' => 'masyarakat',
        ]);

        $response = $this->actingAs($masyarakat)
            ->putJson("/api/admin/users/{$targetUser->id}/reset-password", [
                'password'              => 'newsecret123',
                'password_confirmation' => 'newsecret123',
            ]);

        $response->assertStatus(403);
    }
}
