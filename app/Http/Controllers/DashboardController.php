<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\LogAktivitas;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total'     => Barang::count(),
            'tersedia'  => Barang::where('status', 'Tersedia')->count(),
            'dipinjam'  => Barang::where('status', 'Dipinjam')->count(),
            'rusak'     => Barang::where('status', 'Rusak')->count(),
        ];

        $aktivitasTerbaru = LogAktivitas::latest('waktu')->take(8)->get();

        // Data grafik: peminjaman per bulan tahun ini
        $grafik = Peminjaman::selectRaw('MONTH(tanggal_pinjam) as bulan, COUNT(*) as total')
            ->whereYear('tanggal_pinjam', date('Y'))
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get()
            ->keyBy('bulan');

        $bulanLabel = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
        $grafikData = collect(range(1, 12))->map(fn($b) => [
            'bulan' => $bulanLabel[$b - 1],
            'total' => $grafik->get($b)?->total ?? 0,
        ]);

        return Inertia::render('Dashboard', [
            'stats'            => $stats,
            'aktivitasTerbaru' => $aktivitasTerbaru,
            'grafikData'       => $grafikData,
        ]);
    }
}