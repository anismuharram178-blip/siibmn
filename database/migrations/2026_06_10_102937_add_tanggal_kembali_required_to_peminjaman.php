<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTanggalKembaliRequiredToPeminjaman extends Migration
{
    public function up(): void
    {
        // Tidak perlu ubah schema, cukup enforce di validasi
        // Tapi kita tambah index untuk query performa
        Schema::table('peminjaman', function (Blueprint $table) {
            $table->index(['barang_id', 'tanggal_pinjam', 'tanggal_kembali']);
        });
    }

    public function down(): void
    {
        Schema::table('peminjaman', function (Blueprint $table) {
            $table->dropIndex(['barang_id', 'tanggal_pinjam', 'tanggal_kembali']);
        });
    }
}