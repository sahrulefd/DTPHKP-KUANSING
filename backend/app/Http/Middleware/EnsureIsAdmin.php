<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureIsAdmin — Middleware untuk memastikan user adalah admin.
 *
 * Digunakan di route group admin untuk mencegah
 * akses oleh user dengan role masyarakat.
 */
class EnsureIsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Anda tidak memiliki akses ke halaman ini.',
            ], 403);
        }

        return $next($request);
    }
}
