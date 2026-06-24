<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Carbon\Carbon; // <-- TAMBAHKAN INI

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Tetap pertahankan konfigurasi Vite yang sudah ada
        Vite::prefetch(concurrency: 3);

        // Set locale Carbon ke Bahasa Indonesia agar format tanggal otomatis berbahasa Indonesia
        Carbon::setLocale('id');
    }
}