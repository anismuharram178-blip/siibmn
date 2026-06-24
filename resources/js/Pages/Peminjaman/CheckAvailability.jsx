import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { TiltCard } from "@/Components/TiltCard";

const KATEGORI_ICON = {
    Kendaraan: "directions_car",
    Fasilitas: "apartment",
    Elektronik: "devices",
    Furniture: "chair",
    Lainnya: "inventory_2",
};

export default function CheckAvailability() {
    const [tanggalPinjam, setTanggalPinjam] = useState("");
    const [tanggalKembali, setTanggalKembali] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [errors, setErrors] = useState({});

    const check = async () => {
        setErrors({});
        if (!tanggalPinjam)
            return setErrors({ tanggalPinjam: "Tanggal mulai wajib diisi." });
        if (!tanggalKembali)
            return setErrors({
                tanggalKembali: "Tanggal selesai wajib diisi.",
            });
        if (tanggalKembali < tanggalPinjam)
            return setErrors({
                tanggalKembali:
                    "Tanggal selesai tidak boleh sebelum tanggal mulai.",
            });

        setLoading(true);
        setSearched(false);

        try {
            const params = new URLSearchParams({
                tanggal_pinjam: tanggalPinjam,
                tanggal_kembali: tanggalKembali,
            });
            const res = await fetch(
                route("peminjaman.checkAvailabilityApi") + "?" + params,
            );
            const data = await res.json();
            setResults(data);
            setSearched(true);
        } catch (e) {
            setErrors({ general: "Terjadi kesalahan. Silakan coba lagi." });
        } finally {
            setLoading(false);
        }
    };

    const available = results.filter((r) => r.available);
    const unavailable = results.filter((r) => !r.available);

    const formatDate = (d) =>
        new Date(d).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    return (
        <AuthenticatedLayout header="Check Availability">
            <Head title="Check Availability" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                            Check Availability
                        </h2>
                        <p className="text-[#404944] mt-1">
                            Check which assets are available for a specific date
                            range.
                        </p>
                    </div>
                    <Link
                        href={route("peminjaman.create")}
                        className="flex items-center gap-2 bg-[#064E3B] text-white px-6 py-3 rounded-xl hover:bg-[#0a6b50] transition-all font-semibold shadow-lg active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add
                        </span>
                        Record Loan
                    </Link>
                </div>

                {/* Date Picker Card */}
                <TiltCard className="bg-[#064E3B] rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">
                                event_available
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">
                                Select Date Range
                            </h3>
                            <p className="text-emerald-100/70 text-xs">
                                Enter loan start and end dates to check
                                availability
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[180px]">
                            <label className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mb-2 block">
                                Loan Start Date
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[20px] pointer-events-none">
                                    calendar_today
                                </span>
                                <input
                                    type="date"
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                                    value={tanggalPinjam}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) =>
                                        setTanggalPinjam(e.target.value)
                                    }
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                            {errors.tanggalPinjam && (
                                <p className="text-red-300 text-xs mt-1">
                                    {errors.tanggalPinjam}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center pb-2.5">
                            <span className="material-symbols-outlined text-white/40 text-[28px]">
                                arrow_forward
                            </span>
                        </div>

                        <div className="flex-1 min-w-[180px]">
                            <label className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mb-2 block">
                                Return Date
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[20px] pointer-events-none">
                                    event_available
                                </span>
                                <input
                                    type="date"
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
                                    value={tanggalKembali}
                                    min={
                                        tanggalPinjam ||
                                        new Date().toISOString().split("T")[0]
                                    }
                                    onChange={(e) =>
                                        setTanggalKembali(e.target.value)
                                    }
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                            {errors.tanggalKembali && (
                                <p className="text-red-300 text-xs mt-1">
                                    {errors.tanggalKembali}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={check}
                            disabled={loading}
                            className="flex items-center gap-2 bg-white text-[#064E3B] font-black px-8 py-2.5 rounded-xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95 disabled:opacity-60 text-sm"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Checking...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[20px]">
                                        search
                                    </span>
                                    Check Now
                                </>
                            )}
                        </button>
                    </div>

                    {errors.general && (
                        <p className="text-red-300 text-xs mt-3">
                            {errors.general}
                        </p>
                    )}
                </TiltCard>

                {/* Results */}
                {searched && (
                    <div className="space-y-6">
                        {/* Summary strip */}
                        <div className="grid grid-cols-3 gap-4">
                            <TiltCard className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                                <p className="text-3xl font-black text-[#003527]">
                                    {results.length}
                                </p>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-1">
                                    Total Assets
                                </p>
                            </TiltCard>
                            <TiltCard className="bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm p-5 text-center">
                                <p className="text-3xl font-black text-emerald-700">
                                    {available.length}
                                </p>
                                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mt-1">
                                    Available
                                </p>
                            </TiltCard>
                            <TiltCard className="bg-red-50 rounded-2xl border border-red-200 shadow-sm p-5 text-center">
                                <p className="text-3xl font-black text-red-600">
                                    {unavailable.length}
                                </p>
                                <p className="text-xs text-red-500 font-semibold uppercase tracking-wide mt-1">
                                    Unavailable
                                </p>
                            </TiltCard>
                        </div>

                        {/* Date range info */}
                        <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-6 py-3 shadow-sm">
                            <span className="material-symbols-outlined text-[#064E3B] text-[20px]">
                                date_range
                            </span>
                            <p className="text-sm text-[#404944]">
                                Showing availability for
                                <strong className="text-[#003527] mx-1">
                                    {formatDate(tanggalPinjam)}
                                </strong>
                                to
                                <strong className="text-[#003527] mx-1">
                                    {formatDate(tanggalKembali)}
                                </strong>
                            </p>
                        </div>

                        {/* Available */}
                        {available.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                                        check_circle
                                    </span>
                                    <h3 className="font-bold text-[#003527]">
                                        Available Assets
                                    </h3>
                                    <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                                        {available.length} items
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {available.map((item) => (
                                        <AssetCard
                                            key={item.id}
                                            item={item}
                                            available={true}
                                            tanggalPinjam={tanggalPinjam}
                                            tanggalKembali={tanggalKembali}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Unavailable */}
                        {unavailable.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-red-500 text-[20px]">
                                        cancel
                                    </span>
                                    <h3 className="font-bold text-[#003527]">
                                        Unavailable Assets
                                    </h3>
                                    <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                                        {unavailable.length} items
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {unavailable.map((item) => (
                                        <AssetCard
                                            key={item.id}
                                            item={item}
                                            available={false}
                                            tanggalPinjam={tanggalPinjam}
                                            tanggalKembali={tanggalKembali}
                                            formatDate={formatDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {!searched && !loading && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-[#b0f0d6] flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-[#003527] text-[40px]">
                                event_available
                            </span>
                        </div>
                        <p className="text-[#003527] font-bold text-lg">
                            Select a date range to get started
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            Enter the loan start and end dates above, then click
                            Check Now
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function AssetCard({
    item,
    available,
    tanggalPinjam,
    tanggalKembali,
    formatDate,
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TiltCard
            className={`rounded-2xl border shadow-sm overflow-hidden transition-all
            ${available ? "bg-white border-slate-100" : "bg-slate-50 border-slate-200"}`}
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                            ${available ? "bg-[#b0f0d6]" : "bg-red-100"}`}
                        >
                            <span
                                className={`material-symbols-outlined text-[20px]
                                ${available ? "text-[#003527]" : "text-red-500"}`}
                            >
                                {KATEGORI_ICON[item.kategori] ?? "inventory_2"}
                            </span>
                        </div>
                        <div>
                            <p className="font-bold text-[#003527] text-sm leading-tight">
                                {item.nama_barang}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {item.kategori}
                            </p>
                        </div>
                    </div>
                    <span
                        className={`flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full
                        ${
                            available
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-red-100 text-red-600 border border-red-200"
                        }`}
                    >
                        <span className="material-symbols-outlined text-[12px]">
                            {available ? "check_circle" : "cancel"}
                        </span>
                        {available ? "Available" : "Taken"}
                    </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">
                            location_on
                        </span>
                        {item.lokasi}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">
                            build
                        </span>
                        Kondisi: {item.kondisi}
                    </div>
                </div>

                {/* Schedules for unavailable */}
                {!available && item.schedules?.length > 0 && (
                    <div className="mt-3">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:text-red-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                {expanded ? "expand_less" : "expand_more"}
                            </span>
                            {expanded ? "Hide" : "Show"} {item.schedules.length}{" "}
                            conflicting schedule
                            {item.schedules.length > 1 ? "s" : ""}
                        </button>
                        {expanded && (
                            <div className="mt-2 space-y-1.5">
                                {item.schedules.map((s, i) => (
                                    <div
                                        key={i}
                                        className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs"
                                    >
                                        <p className="font-semibold text-red-700">
                                            {s.nama_peminjam}
                                        </p>
                                        <p className="text-red-500 mt-0.5">
                                            {formatDate(s.tanggal_pinjam)} →{" "}
                                            {s.tanggal_kembali
                                                ? formatDate(s.tanggal_kembali)
                                                : "?"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* CTA for available */}
                {available && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                        <Link
                            href={
                                route("peminjaman.create") +
                                `?barang_id=${item.id}&tanggal_pinjam=${tanggalPinjam}&tanggal_kembali=${tanggalKembali}`
                            }
                            className="w-full flex items-center justify-center gap-2 bg-[#064E3B] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0a6b50] transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                add
                            </span>
                            Pinjam Sekarang
                        </Link>
                    </div>
                )}
            </div>
        </TiltCard>
    );
}
