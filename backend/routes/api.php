<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\GuideController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes — DTPHKP Pelayanan
|--------------------------------------------------------------------------
|
| - Public Routes (tanpa login): Layanan, FAQ, Panduan, Pengaturan, Tracking, Survei
| - Authenticated Routes (Sanctum): Profil, Submit Pengajuan, Riwayat Pengajuan
| - Admin Routes (Sanctum + admin middleware): Management Layanan, Verifikasi, Pengguna, Laporan, Survei
|
*/

// ============================================================
// 1. PUBLIC ROUTES (tanpa autentikasi) & AUTHENTICATION
// ============================================================

require __DIR__.'/auth.php';

// Services (Publik)
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

// FAQs (Publik)
Route::get('/faqs', [FaqController::class, 'index']);

// Guides (Publik)
Route::get('/guides', [GuideController::class, 'index']);
Route::get('/guides/{slug}', [GuideController::class, 'show']);

// Settings / Contact Info (Publik)
Route::get('/settings', [SettingController::class, 'index']);

// Tracking & Verifikasi Pengajuan (Publik)
Route::get('/track/{trackingNumber}', [SubmissionController::class, 'track']);
Route::get('/verify/{trackingNumber}', [SubmissionController::class, 'verifyDocument']);

// Survei SKM Publik
Route::post('/surveys', [SurveyController::class, 'store']);


// ============================================================
// 2. AUTHENTICATED ROUTES (Masyarakat & Admin)
// ============================================================

Route::middleware(['auth:sanctum'])->group(function () {
    // Current User Profile
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => [
                'id'      => $request->user()->id,
                'name'    => $request->user()->name,
                'nik'     => $request->user()->nik,
                'email'   => $request->user()->email,
                'phone'   => $request->user()->phone,
                'address' => $request->user()->address,
                'role'    => $request->user()->role,
            ],
        ]);
    });

    Route::put('/user/profile', [UserController::class, 'updateProfile']);

    // Dashboard Stats
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Submissions (Masyarakat & Admin)
    Route::get('/submissions', [SubmissionController::class, 'index']);
    Route::get('/submissions/{id}', [SubmissionController::class, 'show']);
    Route::post('/submissions', [SubmissionController::class, 'store']);
    Route::post('/submissions/{id}/rate', [SubmissionController::class, 'rateSubmission']);
    Route::delete('/submissions/{id}/cancel', [SubmissionController::class, 'cancel']);


    // ============================================================
    // 3. ADMIN ROUTES (Khusus Role Admin)
    // ============================================================

    Route::middleware(['admin'])->prefix('admin')->group(function () {
        // Services Management
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

        // Submission Verification & Status Change
        Route::put('/submissions/{id}/status', [SubmissionController::class, 'updateStatus']);
        Route::post('/submissions/{id}/status', [SubmissionController::class, 'updateStatus']);
        Route::put('/submissions/{submissionId}/documents/{documentId}/verify', [SubmissionController::class, 'toggleDocumentVerification']);

        // FAQs Management
        Route::post('/faqs', [FaqController::class, 'store']);
        Route::put('/faqs/{id}', [FaqController::class, 'update']);
        Route::delete('/faqs/{id}', [FaqController::class, 'destroy']);

        // Guides Management
        Route::post('/guides', [GuideController::class, 'store']);
        Route::put('/guides/{id}', [GuideController::class, 'update']);
        Route::delete('/guides/{id}', [GuideController::class, 'destroy']);

        // Settings Management
        Route::post('/settings', [SettingController::class, 'update']);

        // User Management
        Route::get('/users', [UserController::class, 'index']);
        Route::put('/users/{id}/reset-password', [UserController::class, 'resetPassword']);

        // Reports
        Route::get('/reports', [ReportController::class, 'index']);

        // Public Survey SKM Results
        Route::get('/surveys', [SurveyController::class, 'index']);
        Route::delete('/surveys/{id}', [SurveyController::class, 'destroy']);
    });
});
