<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\LogAktivitas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index(Request $request)
    {
        $query = Barang::query();

        if ($request->search) {
            $query->where('nama_barang', 'like', '%' . $request->search . '%');
        }

        if ($request->kategori) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $barang = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Barang/Index', [
            'barang'  => $barang,
            'filters' => $request->only(['search', 'kategori', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Barang/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kategori'    => 'required|string|max:100',
            'lokasi'      => 'required|string|max:255',
            'kondisi'     => 'required|in:Baik,Rusak Ringan,Rusak Berat',
            'status'      => 'required|in:Tersedia,Dipinjam,Rusak',
            'deskripsi'   => 'nullable|string',
        ]);

        $barang = Barang::create($validated);

        LogAktivitas::create([
            'aksi'      => 'Tambah Barang',
            'deskripsi' => 'Admin menambahkan barang baru: ' . $barang->nama_barang . ' (ID: ' . $barang->id . ')',
            'waktu'     => now(),
        ]);

        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan.');
    }

    public function show(Barang $barang)
    {
        $barang->load(['peminjaman' => function ($q) {
            $q->latest()->take(10);
        }]);

        return Inertia::render('Barang/Show', [
            'barang' => $barang,
        ]);
    }

    public function edit(Barang $barang)
    {
        return Inertia::render('Barang/Edit', [
            'barang' => $barang,
        ]);
    }

    public function update(Request $request, Barang $barang)
    {
        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kategori'    => 'required|string|max:100',
            'lokasi'      => 'required|string|max:255',
            'kondisi'     => 'required|in:Baik,Rusak Ringan,Rusak Berat',
            'status'      => 'required|in:Tersedia,Dipinjam,Rusak',
            'deskripsi'   => 'nullable|string',
        ]);

        $barang->update($validated);

        LogAktivitas::create([
            'aksi'      => 'Edit Barang',
            'deskripsi' => 'Admin mengubah data barang: ' . $barang->nama_barang . ' (ID: ' . $barang->id . ')',
            'waktu'     => now(),
        ]);

        return redirect()->route('barang.index')->with('success', 'Barang berhasil diperbarui.');
    }

    public function destroy(Barang $barang)
    {
        $nama = $barang->nama_barang;
        $id   = $barang->id;

        $barang->delete();

        LogAktivitas::create([
            'aksi'      => 'Hapus Barang',
            'deskripsi' => 'Admin menghapus barang: ' . $nama . ' (ID: ' . $id . ')',
            'waktu'     => now(),
        ]);

        return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus.');
    }
}