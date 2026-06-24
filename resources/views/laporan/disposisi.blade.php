<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; font-size: 11px; color: #000; }

  /* ── KOP SURAT ── */
  .kop-wrapper {
    border-bottom: 3px solid #000;
    padding-bottom: 8px;
    margin-bottom: 0;
  }
  .kop {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px 6px;
  }
  .kop img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }
  .kop-text {
    flex: 1;
    text-align: center;
  }
  .kop-text .instansi {
    font-size: 11px;
    font-weight: normal;
    letter-spacing: 0.5px;
  }
  .kop-text .univ {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.2;
  }
  .kop-text .alamat {
    font-size: 9px;
    margin-top: 4px;
    line-height: 1.5;
  }
  .thin-line {
    border-top: 1px solid #000;
    margin: 4px 20px 0;
  }

  /* ── BODY ── */
  .body { padding: 0 20px; }

  /* ── JUDUL LEMBAR ── */
  .judul-box {
    border: 1px solid #000;
    border-top: none;
    text-align: center;
    padding: 5px;
    margin: 0;
  }
  .judul-box .judul-utama {
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .judul-box .perhatian {
    font-size: 8.5px;
    margin-top: 2px;
  }

  /* ── TABEL INFO SURAT ── */
  .tabel-info {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
    border-top: none;
  }
  .tabel-info td {
    border: 1px solid #000;
    padding: 4px 8px;
    font-size: 10.5px;
    vertical-align: top;
    line-height: 1.5;
  }
  .tabel-info td.label { font-weight: normal; }
  .tabel-info td.no-border-right { border-right: none; }
  .tabel-info td.no-border-left  { border-left:  none; }

  /* ── TABEL DISPOSISI ── */
  .tabel-disposisi {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
    border-top: none;
    margin-top: -1px;
  }
  .tabel-disposisi td {
    border: 1px solid #000;
    padding: 4px 8px;
    font-size: 10.5px;
    vertical-align: top;
  }
  .tabel-disposisi .catatan-area {
    height: 60px;
    vertical-align: top;
  }

  /* ── TABEL PENERIMA ── */
  .tabel-penerima {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
    border-top: none;
    margin-top: -1px;
  }
  .tabel-penerima td {
    border: 1px solid #000;
    padding: 4px 8px;
    font-size: 10.5px;
    vertical-align: top;
    width: 50%;
  }
  .tabel-penerima .area {
    height: 55px;
    vertical-align: top;
  }
  .tabel-penerima .tgl-row td {
    padding: 3px 8px;
  }

  /* ── FOOTER QR placeholder ── */
  .footer-area {
    padding: 10px 20px 0;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .qr-box {
    width: 60px;
    height: 60px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    color: #999;
    text-align: center;
    flex-shrink: 0;
  }
  .footer-note {
    font-size: 8px;
    color: #666;
    margin-top: 4px;
  }
</style>
</head>
<body>

{{-- ══════════════════════════════
     KOP SURAT
══════════════════════════════ --}}
<div class="kop-wrapper">
  <div class="kop">
    <img src="{{ public_path('images/logo-uin.png') }}" alt="Logo UIN"/>
    <div class="kop-text">
      <p class="instansi">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
      <p class="univ">UNIVERSITAS ISLAM NEGERI<br>SJECH M. DJAMIL DJAMBEK BUKITTINGGI</p>
      <p class="alamat">
        Kampus I: Jalan Paninjauan Garegeh Bukittinggi - Kampus II: Jl. Gurun Aur Kubang Putih<br>
        Kabupaten Agam – Sumatera Barat – Telepon/ Fax: (0752) 22875<br>
        Website: http://uinbukittinggi.ac.id | email info@uinbukittinggi.ac.id
      </p>
    </div>
  </div>
  <div class="thin-line"></div>
</div>

{{-- ══════════════════════════════
     JUDUL
══════════════════════════════ --}}
<div class="body">

  <div class="judul-box">
    <p class="judul-utama">Lembar Disposisi</p>
    <p class="perhatian"><strong>PERHATIAN :</strong> Dilarang Memisahkan sehelai surat pun yang digabung dalam bentuk berkas ini</p>
  </div>

  {{-- ══════════════════════════════
       TABEL INFO SURAT
  ══════════════════════════════ --}}
  <table class="tabel-info">
    <tr>
      <td colspan="2">No Surat : <strong>{{ $nomorSurat }}</strong></td>
      <td>Status : Asli</td>
    </tr>
    <tr>
      <td colspan="2">Tanggal Surat : {{ \Carbon\Carbon::parse($peminjaman->tanggal_pinjam)->format('d-m-Y') }}</td>
      <td>Sifat : Biasa</td>
    </tr>
    <tr>
      <td colspan="3">Lampiran : 1 Permohonan Peminjaman Barang</td>
    </tr>
    <tr>
      <td colspan="3">Diterima Tanggal : {{ \Carbon\Carbon::now()->format('d-m-Y') }}</td>
    </tr>
    <tr>
      <td colspan="2">No Agenda : {{ str_pad($peminjaman->id, 5, '0', STR_PAD_LEFT) }}</td>
      <td>Tingkat : Biasa</td>
    </tr>
    <tr>
      <td colspan="3">Dari : {{ $peminjaman->nama_peminjam }}</td>
    </tr>
    <tr>
      <td colspan="3">
        Perihal : Permohonan peminjaman <strong>{{ $peminjaman->barang->nama_barang }}</strong>
        ({{ $peminjaman->barang->kategori }}) — Lokasi: {{ $peminjaman->barang->lokasi }}
        @if($peminjaman->tanggal_kembali)
          s.d. tgl {{ \Carbon\Carbon::parse($peminjaman->tanggal_kembali)->format('d F Y') }}
        @endif
      </td>
    </tr>
  </table>

  {{-- ══════════════════════════════
       TABEL DISPOSISI
  ══════════════════════════════ --}}
  <table class="tabel-disposisi">
    <tr>
      <td style="width:50%">Disposisi Kepada</td>
      <td style="width:50%">Petunjuk</td>
    </tr>
    <tr>
      <td class="catatan-area">
        <p>Kepala Bagian Umum BMN</p>
        <p style="margin-top:4px; font-size:9px; color:#555;">Unit Pengelola Barang Milik Negara</p>
      </td>
      <td class="catatan-area">
        <p>✓ Disetujui</p>
        <p style="margin-top:4px; font-size:9px;">Mohon ditindaklanjuti sesuai ketentuan yang berlaku.</p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="font-weight:bold;">CATATAN :</td>
    </tr>
    <tr>
      <td colspan="2" style="height:70px; vertical-align:top; padding-top:6px;">
        <p>
          Dengan ini dinyatakan bahwa peminjaman barang <strong>{{ $peminjaman->barang->nama_barang }}</strong>
          atas nama <strong>{{ $peminjaman->nama_peminjam }}</strong> telah disetujui dan dicatat dalam
          sistem inventaris BMN pada tanggal {{ \Carbon\Carbon::parse($peminjaman->tanggal_pinjam)->translatedFormat('d F Y') }}.
          Barang wajib dikembalikan dalam kondisi baik.
        </p>
        <p style="margin-top: 10px; font-size:9px; color:#555;">
          Dicetak otomatis oleh SIIBMN · {{ $tanggalCetak }}
        </p>
      </td>
    </tr>
    <tr>
      <td>Tanggal Penyelesaian :</td>
      <td>Diajukan Kembali Tanggal :</td>
    </tr>
  </table>

  {{-- ══════════════════════════════
       TABEL PENERIMA
  ══════════════════════════════ --}}
  <table class="tabel-penerima">
    <tr>
      <td>Penerima 1 :</td>
      <td>Penerima 2 :</td>
    </tr>
    <tr>
      <td>Petunjuk :</td>
      <td>Petunjuk :</td>
    </tr>
    <tr>
      <td>CATATAN :</td>
      <td>CATATAN :</td>
    </tr>
    <tr>
      <td class="area"></td>
      <td class="area"></td>
    </tr>
    <tr class="tgl-row">
      <td>Tanggal Penyelesaian 1 :</td>
      <td>Tanggal Penyelesaian 2 :</td>
    </tr>
  </table>

</div>

{{-- ══════════════════════════════
     FOOTER
══════════════════════════════ --}}
<div class="footer-area">
  <div class="qr-box">QR<br>Code</div>
  <div>
    <p class="footer-note">
      Dokumen ini diterbitkan secara otomatis oleh<br>
      <strong>SIIBMN — UIN Sjech M. Djamil Djambek Bukittinggi</strong><br>
      No. Transaksi: TRX-{{ str_pad($peminjaman->id, 5, '0', STR_PAD_LEFT) }} · Dicetak: {{ $tanggalCetak }}
    </p>
  </div>
</div>

</body>
</html>