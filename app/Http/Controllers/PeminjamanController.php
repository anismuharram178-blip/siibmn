<?php

namespace App\Http\Controllers;

use App\Helpers\PeminjamanHelper;
use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\LogAktivitas;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Str;

class PeminjamanController extends Controller
{
    public function index(Request $request)
    {
        $query = Peminjaman::with('barang')->latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->search) {
            $query->where('nama_peminjam', 'like', '%' . $request->search . '%');
        }

        $peminjaman = $query->paginate(10)->withQueryString();

        return Inertia::render('Peminjaman/Index', [
            'peminjaman' => $peminjaman,
            'filters'    => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        // Ambil SEMUA barang beserta jadwal aktifnya
        $barang = Barang::orderBy('nama_barang')->get()->map(function ($b) {
            $schedules = PeminjamanHelper::getActiveSchedules($b->id);
            return [
                'id'          => $b->id,
                'nama_barang' => $b->nama_barang,
                'kategori'    => $b->kategori,
                'lokasi'      => $b->lokasi,
                'kondisi'     => $b->kondisi,
                'status'      => $b->status,
                'schedules'   => $schedules, // jadwal yang sudah terpakai
            ];
        });

        return Inertia::render('Peminjaman/Create', [
            'barang' => $barang,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'barang_id'       => 'required|exists:barang,id',
            'nama_peminjam'   => 'required|string|max:255',
            'tanggal_pinjam'  => 'required|date',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_pinjam',
        ]);

        $barang = Barang::findOrFail($validated['barang_id']);

        // Cek konflik tanggal
        $available = PeminjamanHelper::isAvailable(
            $validated['barang_id'],
            $validated['tanggal_pinjam'],
            $validated['tanggal_kembali']
        );

        if (!$available) {
            return back()->withErrors([
                'tanggal_pinjam' => 'Barang sudah dipinjam pada rentang tanggal tersebut. Silakan pilih tanggal lain.',
            ]);
        }

        // Cek kondisi barang
        if ($barang->status === 'Rusak') {
            return back()->withErrors([
                'barang_id' => 'Barang ini sedang dalam kondisi rusak dan tidak dapat dipinjam.',
            ]);
        }

        $validated['status'] = 'Dipinjam';
        $peminjaman = Peminjaman::create($validated);

        // Update status barang
        $barang->update(['status' => 'Dipinjam']);

        LogAktivitas::create([
            'aksi'      => 'Catat Peminjaman',
            'deskripsi' => 'Peminjaman ' . $barang->nama_barang . ' oleh ' . $validated['nama_peminjam']
                         . ' pada ' . $validated['tanggal_pinjam'] . ' s.d. ' . $validated['tanggal_kembali'],
            'waktu'     => now(),
        ]);

        return redirect()
            ->route('peminjaman.show', $peminjaman->id)
            ->with('success', 'Peminjaman berhasil dicatat.')
            ->with('show_disposisi', true);
    }

    public function show(Peminjaman $peminjaman)
    {
        $peminjaman->load('barang');

        return Inertia::render('Peminjaman/Show', [
            'peminjaman'    => $peminjaman,
            'showDisposisi' => session('show_disposisi', false),
        ]);
    }

    public function kembalikan(Request $request, Peminjaman $peminjaman)
    {
        $request->validate([
            'tanggal_kembali' => 'required|date|after_or_equal:' . $peminjaman->tanggal_pinjam,
            'kondisi_kembali' => 'required|in:Baik,Rusak Ringan,Rusak Berat',
        ]);

        $peminjaman->update([
            'status'          => 'Dikembalikan',
            'tanggal_kembali' => $request->tanggal_kembali,
        ]);

        $statusBaru  = $request->kondisi_kembali === 'Baik' ? 'Tersedia' : 'Rusak';
        $kondisiBaru = $request->kondisi_kembali;

        // Cek apakah masih ada peminjaman aktif lain untuk barang ini
        $masihAda = Peminjaman::where('barang_id', $peminjaman->barang_id)
            ->where('status', 'Dipinjam')
            ->where('id', '!=', $peminjaman->id)
            ->exists();

        if (!$masihAda) {
            $peminjaman->barang->update([
                'status'  => $statusBaru,
                'kondisi' => $kondisiBaru,
            ]);
        }

        LogAktivitas::create([
            'aksi'      => 'Proses Pengembalian',
            'deskripsi' => 'Pengembalian ' . $peminjaman->barang->nama_barang
                         . ' oleh ' . $peminjaman->nama_peminjam
                         . ' pada ' . $request->tanggal_kembali
                         . '. Kondisi: ' . $request->kondisi_kembali,
            'waktu'     => now(),
        ]);

        return redirect()->route('peminjaman.index')
            ->with('success', 'Pengembalian berhasil diproses.');
    }

    /**
     * BARIS YANG DITAMBAHKAN: Menampilkan halaman Check Availability (Inertia)
     */
    public function availabilityPage()
    {
        return Inertia::render('Peminjaman/CheckAvailability');
    }

    /**
     * API: Cek ketersediaan barang di rentang tanggal (Menghasilkan JSON)
     */
    public function checkAvailability(Request $request)
    {
        $request->validate([
            'tanggal_pinjam'  => 'required|date',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_pinjam',
        ]);

        $barangs = Barang::where('status', '!=', 'Rusak')
            ->orderBy('nama_barang')
            ->get()
            ->map(function ($b) use ($request) {
                $available = PeminjamanHelper::isAvailable(
                    $b->id,
                    $request->tanggal_pinjam,
                    $request->tanggal_kembali
                );
                $schedules = PeminjamanHelper::getActiveSchedules($b->id);
                return [
                    'id'          => $b->id,
                    'nama_barang' => $b->nama_barang,
                    'kategori'    => $b->kategori,
                    'lokasi'      => $b->lokasi,
                    'kondisi'     => $b->kondisi,
                    'available'   => $available,
                    'schedules'   => $schedules,
                ];
            });

        return response()->json($barangs);
    }

    public function disposisi(Peminjaman $peminjaman)
    {
        $peminjaman->load('barang');
        Carbon::setLocale('id');

        $nomorSurat = 'BMN/' . date('Y') . '/' . date('m') . '/' . str_pad($peminjaman->id, 4, '0', STR_PAD_LEFT);

        $pdf = Pdf::loadView('laporan.disposisi', [
            'peminjaman'   => $peminjaman,
            'nomorSurat'   => $nomorSurat,
            'tanggalSurat' => Carbon::now()->translatedFormat('d F Y'),
            'tanggalCetak' => Carbon::now()->format('d/m/Y H:i'),
        ])->setPaper('a4', 'portrait');

        $filename = 'disposisi_' . str_pad($peminjaman->id, 5, '0', STR_PAD_LEFT) . '_' . Str::slug($peminjaman->nama_peminjam) . '.pdf';

        return $pdf->download($filename);
    }
}