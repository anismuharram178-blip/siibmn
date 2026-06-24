import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { TiltCard } from "@/Components/TiltCard";
import { useEffect, useState } from "react";

export default function Show({ peminjaman, showDisposisi }) {
    const sudahKembali = peminjaman.status === "Dikembalikan";
    const [disposisiReady, setDisposisiReady] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        tanggal_kembali: new Date().toISOString().split("T")[0],
        kondisi_kembali: "Baik",
    });

    const submit = (e) => {
        e.preventDefault();
        if (confirm("Process the return of this asset?")) {
            post(route("peminjaman.kembalikan", peminjaman.id));
        }
    };

    // Auto-trigger disposisi download setelah loan baru
    useEffect(() => {
        if (showDisposisi) {
            setDisposisiReady(true);
        }
    }, [showDisposisi]);

    const downloadDisposisi = () => {
        window.open(route("peminjaman.disposisi", peminjaman.id), "_blank");
    };

    return (
        <AuthenticatedLayout header="Loan Detail">
            <Head title="Loan Detail" />
            <div className="max-w-2xl space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                            Loan Detail
                        </h2>
                        <p className="text-[#404944] mt-1">
                            Transaction record and return processing.
                        </p>
                    </div>
                    <Link
                        href={route("peminjaman.index")}
                        className="flex items-center gap-2 text-sm text-[#404944] hover:text-[#003527] font-semibold transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Back
                    </Link>
                </div>

                {/* Banner Disposisi — muncul otomatis setelah loan baru */}
                {disposisiReady && (
                    <div className="bg-[#064E3B] rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[28px]">
                                    description
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">
                                    Loan Recorded Successfully
                                </p>
                                <h3 className="text-lg font-black mb-1">
                                    Surat Disposisi Siap!
                                </h3>
                                <p className="text-emerald-100/80 text-sm leading-relaxed">
                                    Peminjaman{" "}
                                    <strong className="text-white">
                                        {peminjaman.barang?.nama_barang}
                                    </strong>{" "}
                                    oleh{" "}
                                    <strong className="text-white">
                                        {peminjaman.nama_peminjam}
                                    </strong>{" "}
                                    telah berhasil dicatat. Download surat
                                    disposisi sekarang.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={downloadDisposisi}
                                className="flex items-center gap-2 bg-white text-[#064E3B] font-black px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95 text-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    download
                                </span>
                                Download Surat Disposisi PDF
                            </button>
                            <button
                                onClick={() => setDisposisiReady(false)}
                                className="flex items-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all text-sm font-semibold"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    close
                                </span>
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

                {/* Info Card */}
                <TiltCard className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#064E3B] flex items-center justify-center text-white text-2xl font-black">
                                {peminjaman.nama_peminjam?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#003527]">
                                    {peminjaman.nama_peminjam}
                                </h3>
                                <p className="text-sm text-[#404944]">
                                    {peminjaman.barang?.nama_barang ?? "—"}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full
                            ${
                                peminjaman.status === "Dipinjam"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                {peminjaman.status === "Dipinjam"
                                    ? "outbox"
                                    : "assignment_return"}
                            </span>
                            {peminjaman.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <InfoRow
                            icon="inventory_2"
                            label="Asset"
                            value={peminjaman.barang?.nama_barang ?? "—"}
                        />
                        <InfoRow
                            icon="category"
                            label="Category"
                            value={peminjaman.barang?.kategori ?? "—"}
                        />
                        <InfoRow
                            icon="calendar_today"
                            label="Loan Date"
                            value={new Date(
                                peminjaman.tanggal_pinjam,
                            ).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        />
                        <InfoRow
                            icon="event_available"
                            label="Return Date"
                            value={
                                peminjaman.tanggal_kembali
                                    ? new Date(
                                          peminjaman.tanggal_kembali,
                                      ).toLocaleDateString("id-ID", {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "—"
                            }
                        />
                    </div>

                    {/* Tombol download disposisi selalu tersedia */}
                    <div className="border-t border-slate-100 pt-4">
                        <button
                            onClick={downloadDisposisi}
                            className="flex items-center gap-2 text-[#064E3B] hover:text-[#0a6b50] text-sm font-semibold transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                picture_as_pdf
                            </span>
                            Download Surat Disposisi
                        </button>
                    </div>
                </TiltCard>

                {/* Return Form */}
                {!sudahKembali ? (
                    <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#b0f0d6] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#003527]">
                                    assignment_return
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#003527]">
                                    Process Return
                                </h3>
                                <p className="text-xs text-[#404944]">
                                    Fill in the return details below
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <Field
                                label="Actual Return Date"
                                error={errors.tanggal_kembali}
                            >
                                <input
                                    type="date"
                                    className={inp(errors.tanggal_kembali)}
                                    value={data.tanggal_kembali}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_kembali",
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>

                            <Field
                                label="Asset Condition on Return"
                                error={errors.kondisi_kembali}
                            >
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            val: "Baik",
                                            icon: "check_circle",
                                            color: "emerald",
                                        },
                                        {
                                            val: "Rusak Ringan",
                                            icon: "warning",
                                            color: "amber",
                                        },
                                        {
                                            val: "Rusak Berat",
                                            icon: "report_problem",
                                            color: "red",
                                        },
                                    ].map((opt) => (
                                        <button
                                            key={opt.val}
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    "kondisi_kembali",
                                                    opt.val,
                                                )
                                            }
                                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition-all
                                                ${
                                                    data.kondisi_kembali ===
                                                    opt.val
                                                        ? opt.color ===
                                                          "emerald"
                                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                            : opt.color ===
                                                                "amber"
                                                              ? "border-amber-500 bg-amber-50 text-amber-700"
                                                              : "border-red-500 bg-red-50 text-red-700"
                                                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                                                }`}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-[24px]
                                                ${
                                                    data.kondisi_kembali ===
                                                    opt.val
                                                        ? opt.color ===
                                                          "emerald"
                                                            ? "text-emerald-600"
                                                            : opt.color ===
                                                                "amber"
                                                              ? "text-amber-600"
                                                              : "text-red-600"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                {opt.icon}
                                            </span>
                                            {opt.val}
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">
                                    info
                                </span>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    If condition is{" "}
                                    <strong>Rusak Ringan</strong> or{" "}
                                    <strong>Rusak Berat</strong>, the asset
                                    status will automatically change to{" "}
                                    <strong>Rusak</strong>.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        assignment_return
                                    </span>
                                    {processing
                                        ? "Processing..."
                                        : "Confirm Return"}
                                </button>
                                <Link
                                    href={route("peminjaman.index")}
                                    className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                                >
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white">
                                check_circle
                            </span>
                        </div>
                        <div>
                            <p className="font-bold text-emerald-700">
                                Asset Successfully Returned
                            </p>
                            <p className="text-sm text-emerald-600 mt-0.5">
                                This transaction has been completed.
                            </p>
                            <Link
                                href={route("peminjaman.index")}
                                className="inline-flex items-center gap-2 mt-4 bg-[#064E3B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0a6b50] transition-all"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_back
                                </span>
                                Back to Loan List
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
            <span className="material-symbols-outlined text-[#064E3B] text-[20px] mt-0.5">
                {icon}
            </span>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {label}
                </p>
                <p className="text-sm font-semibold text-[#003527] mt-0.5">
                    {value}
                </p>
            </div>
        </div>
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
