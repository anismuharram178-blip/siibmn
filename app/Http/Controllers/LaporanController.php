<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $query = Peminjaman::with('barang')->latest('tanggal_pinjam');

        if ($request->bulan) {
            $query->whereMonth('tanggal_pinjam', $request->bulan);
        }

        if ($request->tahun) {
            $query->whereYear('tanggal_pinjam', $request->tahun);
        }

        if ($request->barang) {
            $query->whereHas('barang', fn($q) => $q->where('nama_barang', 'like', '%' . $request->barang . '%'));
        }

        $histori = $query->paginate(15)->withQueryString();

        $tahunList = Peminjaman::selectRaw('YEAR(tanggal_pinjam) as tahun')
            ->groupBy('tahun')->orderByDesc('tahun')->pluck('tahun');

        return Inertia::render('Laporan/Index', [
            'histori'   => $histori,
            'filters'   => $request->only(['bulan', 'tahun', 'barang']),
            'tahunList' => $tahunList,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $request->validate([
            'tipe'  => 'required|in:bulanan,tahunan',
            'bulan' => 'required_if:tipe,bulanan|nullable|integer|min:1|max:12',
            'tahun' => 'required|integer',
        ]);

        $query = Peminjaman::with('barang')->whereYear('tanggal_pinjam', $request->tahun);

        if ($request->tipe === 'bulanan') {
            $query->whereMonth('tanggal_pinjam', $request->bulan);
        }

        $data = $query->latest('tanggal_pinjam')->get();

        $bulanLabel = ['','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

        $judul = $request->tipe === 'bulanan'
            ? 'Laporan Peminjaman Bulan ' . $bulanLabel[$request->bulan] . ' ' . $request->tahun
            : 'Laporan Peminjaman Tahunan ' . $request->tahun;

        $pdf = Pdf::loadView('laporan.pdf', [
            'judul'      => $judul,
            'data'       => $data,
            'tipe'       => $request->tipe,
            'tahun'      => $request->tahun,
            'bulan'      => $request->bulan ?? null,
            'bulanLabel' => $bulanLabel,
            'tanggalCetak' => now()->format('d F Y'),
        ])->setPaper('a4', 'portrait');

        $filename = 'laporan_' . $request->tipe . '_' . $request->tahun . ($request->tipe === 'bulanan' ? '_' . $request->bulan : '') . '.pdf';

        return $pdf->download($filename);
    }
}