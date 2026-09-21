<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'nik'      => ['required', 'string', 'size:16', 'unique:' . User::class],
            'email'    => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'phone'    => ['required', 'string', 'max:20'],
            'address'  => ['required', 'string', 'max:500'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'name.required'     => 'Nama lengkap wajib diisi.',
            'nik.required'      => 'NIK wajib diisi.',
            'nik.size'          => 'NIK harus berjumlah tepat 16 digit.',
            'nik.unique'        => 'NIK ini sudah terdaftar pada sistem. Silakan gunakan NIK lain atau lakukan Login.',
            'email.required'    => 'Alamat email wajib diisi.',
            'email.email'       => 'Format email tidak valid.',
            'email.unique'      => 'Alamat email ini sudah terdaftar. Silakan gunakan email lain.',
            'phone.required'    => 'Nomor telepon/WA wajib diisi.',
            'address.required'  => 'Alamat lengkap wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'nik'      => $request->nik,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'address'  => $request->address,
            'role'     => 'masyarakat',
            'password' => Hash::make($request->string('password')),
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        return response()->json([
            'message' => 'Registrasi berhasil.',
            'user'    => [
                'id'      => $user->id,
                'name'    => $user->name,
                'nik'     => $user->nik,
                'email'   => $user->email,
                'phone'   => $user->phone,
                'address' => $user->address,
                'role'    => $user->role,
            ],
        ], 201);
    }
}
