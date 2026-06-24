import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";

const KATEGORI_ICON = {
    Kendaraan: "directions_car",
    Fasilitas: "apartment",
    Elektronik: "devices",
    Furniture: "chair",
    Lainnya: "inventory_2",
};

export default function Create({ barang }) {
    // Pre-fill dari query params (dari halaman check availability)
    const params = new URLSearchParams(window.location.search);

    const { data, setData, post, processing, errors } = useForm({
        barang_id: params.get("barang_id") || "",
        nama_peminjam: "",
        tanggal_pinjam: params.get("tanggal_pinjam") || "",
        tanggal_kembali: params.get("tanggal_kembali") || "",
    });

    const [selectedBarang, setSelectedBarang] = useState(
        barang.find((b) => String(b.id) === params.get("barang_id")) || null,
    );

    const handleBarangChange = (id) => {
        setData("barang_id", id);
        setSelectedBarang(barang.find((b) => String(b.id) === id) || null);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("peminjaman.store"));
    };

    const formatDate = (d) =>
        new Date(d).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <AuthenticatedLayout header="Record Loan">
            <Head title="Record Loan" />
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Record New Loan
                    </h2>
                    <p className="text-[#404944] mt-1">
                        Register an asset borrowing transaction.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <form onSubmit={submit} className="space-y-5">
                        {/* Pilih Barang */}
                        <Field label="Asset to Borrow" error={errors.barang_id}>
                            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                {barang.map((b) => {
                                    const isSelected =
                                        String(data.barang_id) === String(b.id);
                                    const isRusak = b.status === "Rusak";
                                    const isBusy = b.schedules?.length > 0;

                                    return (
                                        <button
                                            key={b.id}
                                            type="button"
                                            disabled={isRusak}
                                            onClick={() =>
                                                handleBarangChange(String(b.id))
                                            }
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                                                ${
                                                    isRusak
                                                        ? "opacity-40 cursor-not-allowed border-slate-100 bg-slate-50"
                                                        : isSelected
                                                          ? "border-[#064E3B] bg-emerald-50"
                                                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div
                                                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                                                ${isSelected ? "bg-[#064E3B]" : "bg-slate-100"}`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-[18px]
                                                    ${isSelected ? "text-white" : "text-slate-500"}`}
                                                >
                                                    {KATEGORI_ICON[
                                                        b.kategori
                                                    ] ?? "inventory_2"}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#003527] text-sm">
                                                    {b.nama_barang}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {b.kategori} · {b.lokasi}
                                                </p>
                                            </div>
                                            {/* Status badge */}
                                            {isRusak ? (
                                                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex-shrink-0">
                                                    Rusak
                                                </span>
                                            ) : isBusy ? (
                                                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[11px]">
                                                        schedule
                                                    </span>
                                                    Dijadwalkan
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[11px]">
                                                        check_circle
                                                    </span>
                                                    Tersedia
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </Field>

                        {/* Jadwal konflik barang terpilih */}
                        {selectedBarang?.schedules?.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-amber-600 text-[18px]">
                                        schedule
                                    </span>
                                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                                        Jadwal Sudah Terpakai
                                    </p>
                                </div>
                                <div className="space-y-1.5">
                                    {selectedBarang.schedules.map((s, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 text-xs text-amber-700"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">
                                                block
                                            </span>
                                            <span className="font-semibold">
                                                {s.nama_peminjam}:
                                            </span>
                                            <span>
                                                {formatDate(s.tanggal_pinjam)} →{" "}
                                                {s.tanggal_kembali
                                                    ? formatDate(
                                                          s.tanggal_kembali,
                                                      )
                                                    : "?"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-amber-600 mt-2">
                                    ⚠ Pilih tanggal di luar jadwal di atas agar
                                    tidak terjadi konflik.
                                </p>
                            </div>
                        )}

                        <Field
                            label="Borrower Name"
                            error={errors.nama_peminjam}
                        >
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    person
                                </span>
                                <input
                                    className={`${inp(errors.nama_peminjam)} pl-10`}
                                    value={data.nama_peminjam}
                                    onChange={(e) =>
                                        setData("nama_peminjam", e.target.value)
                                    }
                                    placeholder="Full name of borrower"
                                />
                            </div>
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Loan Start Date"
                                error={errors.tanggal_pinjam}
                            >
                                <input
                                    type="date"
                                    className={inp(errors.tanggal_pinjam)}
                                    value={data.tanggal_pinjam}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_pinjam",
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Return Date"
                                error={errors.tanggal_kembali}
                            >
                                <input
                                    type="date"
                                    className={inp(errors.tanggal_kembali)}
                                    value={data.tanggal_kembali}
                                    min={data.tanggal_pinjam}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_kembali",
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>

                        <div className="flex items-start gap-3 bg-[#b0f0d6]/30 border border-emerald-200 rounded-xl p-4">
                            <span className="material-symbols-outlined text-[#003527] text-[20px] mt-0.5">
                                info
                            </span>
                            <p className="text-xs text-[#404944] leading-relaxed">
                                Barang ditandai{" "}
                                <strong className="text-amber-600">
                                    Dijadwalkan
                                </strong>{" "}
                                berarti sudah ada peminjaman di tanggal
                                tertentu. Anda masih bisa meminjam barang
                                tersebut di tanggal yang berbeda.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing || !data.barang_id}
                                className="flex items-center gap-2 bg-[#064E3B] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0a6b50] disabled:opacity-50 transition-all shadow-lg"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    outbox
                                </span>
                                {processing ? "Recording..." : "Record Loan"}
                            </button>
                            <Link
                                href={route("peminjaman.checkAvailability")}
                                className="flex items-center gap-2 bg-emerald-50 text-[#064E3B] border border-emerald-200 px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-100 transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    event_available
                                </span>
                                Check Availability
                            </Link>
                            <Link
                                href={route("peminjaman.index")}
                                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const inp = (err) =>
    `w-full bg-slate-50 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all ${err ? "border-red-400" : "border-slate-200"}`;

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1.5 uppercase tracking-wide">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        error
                    </span>
                    {error}
                </p>
            )}
        </div>
    );
}
