<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\LogAktivitasController;

// Step 6.3 — Redirect Root ke Dashboard
// Sekarang ketika akses domain utama, otomatis diarahkan ke login/dashboard
Route::get('/', function () {
    return redirect()->route('dashboard');
});

// Step 6.2 — Optimasi & Keamanan Final
// Seluruh route fitur sekarang berada di dalam perlindungan middleware 'auth'
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('barang', BarangController::class);

    // BARIS YANG DIPERBARUI: Memisahkan Route Halaman View dan Route API data
    Route::get('peminjaman/check-availability', [PeminjamanController::class, 'availabilityPage'])
        ->name('peminjaman.checkAvailability');
    Route::get('peminjaman/check-availability-api', [PeminjamanController::class, 'checkAvailability'])
        ->name('peminjaman.checkAvailabilityApi');

    Route::resource('peminjaman', PeminjamanController::class)
        ->only(['index', 'create', 'store', 'show']);
    Route::post('peminjaman/{peminjaman}/kembalikan', [PeminjamanController::class, 'kembalikan'])
        ->name('peminjaman.kembalikan');
    Route::get('peminjaman/{peminjaman}/disposisi', [PeminjamanController::class, 'disposisi'])
        ->name('peminjaman.disposisi');

    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::get('/laporan/export-pdf', [LaporanController::class, 'exportPdf'])->name('laporan.exportPdf');

    Route::get('/log', [LogAktivitasController::class, 'index'])->name('log.index');
});

Route::get('/developer', function () {
    return Inertia::render('Developer');
})->name('developer');

require __DIR__.'/auth.php';