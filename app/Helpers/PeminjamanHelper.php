<?php

namespace App\Helpers;

use App\Models\Peminjaman;

class PeminjamanHelper
{
    /**
     * Cek apakah barang tersedia di rentang tanggal tertentu
     */
    public static function isAvailable(int $barangId, string $tanggalPinjam, string $tanggalKembali, ?int $exceptId = null): bool
    {
        $query = Peminjaman::where('barang_id', $barangId)
            ->where('status', 'Dipinjam')
            ->where(function ($q) use ($tanggalPinjam, $tanggalKembali) {
                // Overlap check: existing.start <= new.end AND existing.end >= new.start
                $q->where('tanggal_pinjam', '<=', $tanggalKembali)
                  ->where('tanggal_kembali', '>=', $tanggalPinjam);
            });

        if ($exceptId) {
            $query->where('id', '!=', $exceptId);
        }

        return $query->count() === 0;
    }

    /**
     * Ambil jadwal peminjaman aktif untuk suatu barang
     */
    public static function getActiveSchedules(int $barangId): array
    {
        return Peminjaman::where('barang_id', $barangId)
            ->where('status', 'Dipinjam')
            ->where('tanggal_kembali', '>=', now()->format('Y-m-d'))
            ->select('tanggal_pinjam', 'tanggal_kembali', 'nama_peminjam')
            ->orderBy('tanggal_pinjam')
            ->get()
            ->toArray();
    }

    /**
     * Ambil barang yang tersedia di tanggal tertentu
     */
    public static function getAvailableOnDate(string $tanggal): array
    {
        $sedangDipinjam = Peminjaman::where('status', 'Dipinjam')
            ->where('tanggal_pinjam', '<=', $tanggal)
            ->where('tanggal_kembali', '>=', $tanggal)
            ->pluck('barang_id')
            ->toArray();

        return $sedangDipinjam;
    }
}