<?php

namespace App\Http\Controllers;

use App\Models\LogAktivitas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogAktivitasController extends Controller
{
    public function index(Request $request)
    {
        $query = LogAktivitas::latest('waktu');

        if ($request->aksi) {
            $query->where('aksi', $request->aksi);
        }

        if ($request->search) {
            $query->where('deskripsi', 'like', '%' . $request->search . '%');
        }

        $logs = $query->paginate(20)->withQueryString();

        $aksiList = LogAktivitas::distinct()->pluck('aksi');

        return Inertia::render('Log/Index', [
            'logs'     => $logs,
            'filters'  => $request->only(['aksi', 'search']),
            'aksiList' => $aksiList,
        ]);
    }
}