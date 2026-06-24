<?php

namespace Database\Seeders;

use App\Models\Barang;
use App\Models\Peminjaman;
use App\Models\LogAktivitas;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    public function run(): void
    {
        $barangs = [
            ['nama_barang' => 'Mobil Avanza',    'kategori' => 'Kendaraan', 'lokasi' => 'Garasi Utama',       'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Kendaraan dinas roda empat kapasitas 7 penumpang.'],
            ['nama_barang' => 'Mobil Xenia',     'kategori' => 'Kendaraan', 'lokasi' => 'Garasi Utama',       'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Kendaraan dinas roda empat kapasitas 7 penumpang.'],
            ['nama_barang' => 'Mobil Hiace',     'kategori' => 'Kendaraan', 'lokasi' => 'Garasi Utama',       'kondisi' => 'Baik',         'status' => 'Dipinjam', 'deskripsi' => 'Kendaraan dinas kapasitas 15 penumpang.'],
            ['nama_barang' => 'Bus Kecil',       'kategori' => 'Kendaraan', 'lokasi' => 'Garasi Belakang',    'kondisi' => 'Rusak Ringan', 'status' => 'Rusak',    'deskripsi' => 'Bus kapasitas 25 penumpang, sedang dalam perbaikan.'],
            ['nama_barang' => 'Bus Besar',       'kategori' => 'Kendaraan', 'lokasi' => 'Garasi Belakang',    'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Bus kapasitas 40 penumpang.'],
            ['nama_barang' => 'Lapangan Tenis',  'kategori' => 'Fasilitas', 'lokasi' => 'Area Olahraga',      'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Lapangan tenis outdoor standar.'],
            ['nama_barang' => 'Auditorium',      'kategori' => 'Fasilitas', 'lokasi' => 'Gedung Pusat',       'kondisi' => 'Baik',         'status' => 'Dipinjam', 'deskripsi' => 'Auditorium utama kapasitas 500 orang.'],
            ['nama_barang' => 'Gedung S1',       'kategori' => 'Fasilitas', 'lokasi' => 'Kampus Utama',       'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Gedung perkuliahan S1 lantai 4.'],
            ['nama_barang' => 'Gedung S2',       'kategori' => 'Fasilitas', 'lokasi' => 'Kampus Utama',       'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Gedung perkuliahan S2 lantai 3.'],
            ['nama_barang' => 'Aula FUAD',       'kategori' => 'Fasilitas', 'lokasi' => 'Fakultas FUAD',      'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Aula Fakultas Ushuluddin Adab dan Dakwah.'],
            ['nama_barang' => 'Aula FTIK',       'kategori' => 'Fasilitas', 'lokasi' => 'Fakultas FTIK',      'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Aula Fakultas Tarbiyah dan Ilmu Keguruan.'],
            ['nama_barang' => 'Aula FEBI',       'kategori' => 'Fasilitas', 'lokasi' => 'Fakultas FEBI',      'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Aula Fakultas Ekonomi dan Bisnis Islam.'],
            ['nama_barang' => 'Proyektor Epson', 'kategori' => 'Elektronik','lokasi' => 'Gudang Elektronik',  'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Proyektor Full HD 3500 lumens.'],
            ['nama_barang' => 'Laptop Dell',     'kategori' => 'Elektronik','lokasi' => 'Ruang IT',           'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Laptop Dell Latitude untuk keperluan presentasi.'],
            ['nama_barang' => 'Sound System',    'kategori' => 'Elektronik','lokasi' => 'Gudang Elektronik',  'kondisi' => 'Baik',         'status' => 'Tersedia', 'deskripsi' => 'Sound system portable untuk acara indoor/outdoor.'],
        ];

        foreach ($barangs as $item) {
            Barang::create($item);
        }

        // Seeder peminjaman sample
        $samples = [
            ['barang_id' => 3,  'nama_peminjam' => 'Dr. Budi Santoso',    'tanggal_pinjam' => now()->subDays(5)->format('Y-m-d'),  'tanggal_kembali' => null,                               'status' => 'Dipinjam'],
            ['barang_id' => 7,  'nama_peminjam' => 'Panitia Wisuda 2026', 'tanggal_pinjam' => now()->subDays(2)->format('Y-m-d'),  'tanggal_kembali' => null,                               'status' => 'Dipinjam'],
            ['barang_id' => 13, 'nama_peminjam' => 'Humas Universitas',   'tanggal_pinjam' => now()->subDays(10)->format('Y-m-d'), 'tanggal_kembali' => now()->subDays(8)->format('Y-m-d'), 'status' => 'Dikembalikan'],
            ['barang_id' => 14, 'nama_peminjam' => 'Prodi Informatika',   'tanggal_pinjam' => now()->subDays(15)->format('Y-m-d'), 'tanggal_kembali' => now()->subDays(12)->format('Y-m-d'),'status' => 'Dikembalikan'],
            ['barang_id' => 1,  'nama_peminjam' => 'Rektor UIN',          'tanggal_pinjam' => now()->subMonth()->format('Y-m-d'),  'tanggal_kembali' => now()->subDays(25)->format('Y-m-d'),'status' => 'Dikembalikan'],
        ];

        foreach ($samples as $p) {
            Peminjaman::create($p);
        }

        // Log aktivitas sample
        $logs = [
            ['aksi' => 'Tambah Barang',       'deskripsi' => 'Admin menambahkan barang baru: Mobil Avanza (ID: 1)',                              'waktu' => now()->subDays(20)],
            ['aksi' => 'Catat Peminjaman',     'deskripsi' => 'Peminjaman Mobil Hiace oleh Dr. Budi Santoso pada ' . now()->subDays(5)->format('Y-m-d'), 'waktu' => now()->subDays(5)],
            ['aksi' => 'Catat Peminjaman',     'deskripsi' => 'Peminjaman Auditorium oleh Panitia Wisuda 2026 pada ' . now()->subDays(2)->format('Y-m-d'), 'waktu' => now()->subDays(2)],
            ['aksi' => 'Proses Pengembalian',  'deskripsi' => 'Pengembalian Proyektor Epson oleh Humas Universitas. Kondisi: Baik',               'waktu' => now()->subDays(8)],
            ['aksi' => 'Edit Barang',          'deskripsi' => 'Admin mengubah kondisi Bus Kecil menjadi Rusak Ringan',                            'waktu' => now()->subDays(3)],
        ];

        foreach ($logs as $log) {
            LogAktivitas::create($log);
        }
    }
}