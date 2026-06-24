<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'barang';

    protected $fillable = [
        'nama_barang', 'kategori', 'lokasi',
        'kondisi', 'status', 'deskripsi',
    ];

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'barang_id');
    }
}