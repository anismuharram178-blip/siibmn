<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 12px; color: #334155; line-height: 1.5; }

  /* Header menggunakan warna Hijau Gelap sesuai AuthenticatedLayout */
  .header { background: #064E3B; color: white; padding: 30px 24px; margin-bottom: 25px; }
  .header h1 { font-size: 18px; margin-bottom: 4px; font-weight: bold; letter-spacing: 0.5px; }
  .header p  { font-size: 11px; opacity: 0.9; }

  .meta { padding: 0 24px; margin-bottom: 20px; }
  .meta table { width: 100%; border-collapse: collapse; }
  .meta td { padding: 4px 0; font-size: 11px; color: #475569; }
  .meta td:first-child { width: 140px; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 9px; letter-spacing: 1px; }
  .meta td strong { color: #003527; }

  /* Judul Section dengan border hijau */
  .section-title { padding: 0 24px; font-size: 13px; font-weight: bold;
    color: #003527; border-left: 4px solid #064E3B; margin-bottom: 12px; padding-left: 10px; margin-left: 24px; }

  /* Tabel Data */
  .data-table { width: calc(100% - 48px); margin: 0 24px 25px; border-collapse: collapse; border: 1px solid #e2e8f0; }
  .data-table th { background: #064E3B; color: white; padding: 10px 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .data-table td { padding: 9px 12px; border-bottom: 1px solid #f1f5f9; font-size: 11px; vertical-align: middle; }
  .data-table tr:nth-child(even) td { background: #f8fafc; }

  /* Badge Status sesuai Index.jsx */
  .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 9px; font-weight: bold; text-transform: uppercase; }
  .badge-dipinjam     { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
  .badge-dikembalikan { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }

  /* Summary Card dengan warna emerald yang sangat muda */
  .summary { margin: 0 24px 25px; background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 18px 20px; }
  .summary h4 { font-size: 11px; color: #064E3B; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
  .summary-grid { display: flex; width: 100%; }
  .summary-item { width: 33.33%; }
  .summary-item p:first-child { font-size: 9px; color: #64748b; text-transform: uppercase; margin-bottom: 4px; font-weight: bold; }
  .summary-item p:last-child  { font-size: 20px; font-weight: bold; color: #003527; }

  .footer { margin-top: 40px; padding: 15px 24px; border-top: 1px solid #f1f5f9;
    font-size: 9px; color: #94a3b8; display: flex; justify-content: space-between; }
</style>
</head>
<body>

<div class="header">
  <h1>UIN Sjech M. Djamil Djambek Bukittinggi</h1>
  <p>Sistem Informasi Inventaris Barang Milik Negara (SIIBMN)</p>
</div>

<div class="meta">
  <table>
    <tr><td>Judul Laporan</td><td>: <strong>{{ $judul }}</strong></td></tr>
    <tr><td>Tanggal Cetak</td><td>: {{ $tanggalCetak }}</td></tr>
    <tr><td>Total Transaksi</td><td>: {{ $data->count() }} transaksi</td></tr>
  </table>
</div>

<div class="summary">
  <h4>Ringkasan Laporan</h4>
  <table style="width: 100%; border: none;">
    <tr>
      <td class="summary-item" style="border: none;">
        <p>Total Transaksi</p>
        <p>{{ $data->count() }}</p>
      </td>
      <td class="summary-item" style="border: none;">
        <p>Masih Dipinjam</p>
        <p style="color: #B45309;">{{ $data->where('status', 'Dipinjam')->count() }}</p>
      </td>
      <td class="summary-item" style="border: none;">
        <p>Sudah Kembali</p>
        <p style="color: #047857;">{{ $data->where('status', 'Dikembalikan')->count() }}</p>
      </td>
    </tr>
  </table>
</div>

<div class="section-title">Daftar Transaksi Peminjaman</div>

@if($data->count() === 0)
  <p style="padding: 20px 24px; color: #94a3b8; font-style: italic; text-align: center;">Tidak ada data transaksi pada periode ini.</p>
@else
<table class="data-table">
  <thead>
    <tr>
      <th style="width: 30px;">#</th>
      <th>Nama Peminjam</th>
      <th>Nama Barang</th>
      <th style="text-align: center;">Tgl Pinjam</th>
      <th style="text-align: center;">Tgl Kembali</th>
      <th style="text-align: center;">Status</th>
    </tr>
  </thead>
  <tbody>
    @foreach($data as $i => $row)
    <tr>
      <td>{{ $i + 1 }}</td>
      <td style="font-weight: bold; color: #0f172a;">{{ $row->nama_peminjam }}</td>
      <td>{{ $row->barang?->nama_barang ?? '-' }}</td>
      <td style="text-align: center;">{{ \Carbon\Carbon::parse($row->tanggal_pinjam)->format('d/m/Y') }}</td>
      <td style="text-align: center;">{{ $row->tanggal_kembali ? \Carbon\Carbon::parse($row->tanggal_kembali)->format('d/m/Y') : '-' }}</td>
      <td style="text-align: center;">
        <span class="badge {{ $row->status === 'Dipinjam' ? 'badge-dipinjam' : 'badge-dikembalikan' }}">
          {{ $row->status }}
        </span>
      </td>
    </tr>
    @endforeach
  </tbody>
</table>
@endif

<div class="footer">
  <span>SIIBMN — UIN Sjech M. Djamil Djambek Bukittinggi</span>
  <span style="float: right;">Dokumen ini dihasilkan secara otomatis melalui sistem — {{ $tanggalCetak }}</span>
</div>

</body>
</html>