<?php

namespace App\Services;

use App\Models\Submission;
use Illuminate\Support\Facades\Log;

/**
 * Service NotificationService — Penanganan Notifikasi WhatsApp & Email
 */
class NotificationService
{
    /**
     * Kirim notifikasi perubahan status pengajuan ke WA & Email pemohon.
     */
    public static function sendStatusNotification(Submission $submission): void
    {
        $user = $submission->user;
        $service = $submission->service;

        if (!$user) return;

        $statusLabel = match ($submission->status) {
            'diproses' => 'DIPROSES',
            'ditolak'  => 'DITOLAK',
            'selesai'  => 'SELESAI',
            default    => 'MENUNGGU VERIFIKASI',
        };

        $message = "Yth. Bpk/Ibu {$user->name},\n\n";
        $message .= "Status permohonan layanan *{$service->name}* Anda dengan Nomor Tracking *{$submission->tracking_number}* saat ini telah diperbarui menjadi: *{$statusLabel}*.\n\n";

        if ($submission->status === 'ditolak' && $submission->rejection_reason) {
            $message .= "Alasan Penolakan: {$submission->rejection_reason}\n\n";
        }

        if ($submission->admin_notes) {
            $message .= "Catatan Petugas: {$submission->admin_notes}\n\n";
        }

        if ($submission->status === 'selesai') {
            $message .= "Silakan login ke Portal Pelayanan DTPHKP Kuansing untuk mengunduh/mencetak Surat Resmi A4 hasil pelayanan.\n\n";
        }

        $message .= "Terima kasih.\nDinas Tanaman Pangan, Hortikultura dan Ketahanan Pangan Kabupaten Kuantan Singingi";

        // Log simulasi WhatsApp Gateway ke storage/logs/laravel.log
        Log::info("WA_GATEWAY_NOTIFICATION: Sent to [{$user->phone}] -> {$message}");
    }
}
