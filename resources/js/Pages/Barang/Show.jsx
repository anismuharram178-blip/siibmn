import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { TiltCard } from "@/Components/TiltCard";

const STATUS_STYLE = {
    Tersedia: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Dipinjam: "bg-amber-50 text-amber-700 border border-amber-200",
    Rusak: "bg-red-50 text-red-600 border border-red-200",
};
const STATUS_ICON = {
    Tersedia: "check_circle",
    Dipinjam: "outbox",
    Rusak: "report_problem",
};

const KATEGORI_ICON = {
    Kendaraan: "directions_car",
    Elektronik: "devices",
    Fasilitas: "apartment",
    Furniture: "chair",
    Lainnya: "inventory_2",
};

export default function Show({ barang }) {
    return (
        <AuthenticatedLayout header="Asset Detail">
            <Head title="Asset Detail" />
            <div className="max-w-3xl space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                            Asset Detail
                        </h2>
                        <p className="text-[#404944] mt-1">
                            Full information and borrowing history.
                        </p>
                    </div>
                    <Link
                        href={route("barang.index")}
                        className="flex items-center gap-2 text-sm text-[#404944] hover:text-[#003527] font-semibold transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        Back
                    </Link>
                </div>

                {/* Main Info Card */}
                <TiltCard className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex items-start gap-5 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#b0f0d6] flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[#003527] text-[32px]">
                                {KATEGORI_ICON[barang.kategori] ??
                                    "inventory_2"}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#003527]">
                                        {barang.nama_barang}
                                    </h3>
                                    <p className="text-[#404944] text-sm mt-0.5">
                                        {barang.kategori} · {barang.lokasi}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${STATUS_STYLE[barang.status]}`}
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        {STATUS_ICON[barang.status]}
                                    </span>
                                    {barang.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        <InfoBox
                            icon="category"
                            label="Category"
                            value={barang.kategori}
                        />
                        <InfoBox
                            icon="location_on"
                            label="Location"
                            value={barang.lokasi}
                        />
                        <InfoBox
                            icon="build"
                            label="Condition"
                            value={barang.kondisi}
                        />
                        <InfoBox
                            icon="calendar_today"
                            label="Registered"
                            value={new Date(
                                barang.created_at,
                            ).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        />
                        {barang.deskripsi && (
                            <div className="col-span-2 bg-slate-50 rounded-xl p-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                                    Description
                                </p>
                                <p className="text-sm text-[#404944]">
                                    {barang.deskripsi}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={route("barang.edit", barang.id)}
                            className="flex items-center gap-2 bg-[#064E3B] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0a6b50] transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                edit
                            </span>
                            Edit Asset
                        </Link>
                    </div>
                </TiltCard>

                {/* Loan History */}
                <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-[#064E3B]">
                            history
                        </span>
                        <h4 className="font-bold text-[#003527]">
                            Recent Loan History
                        </h4>
                    </div>

                    {!barang.peminjaman?.length ? (
                        <div className="text-center py-10">
                            <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">
                                swap_horiz
                            </span>
                            <p className="text-slate-400 text-sm">
                                No borrowing history for this asset.
                            </p>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b border-slate-100">
                                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Borrower
                                    </th>
                                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Loan Date
                                    </th>
                                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Return Date
                                    </th>
                                    <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {barang.peminjaman.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#064E3B] flex items-center justify-center text-white text-xs font-bold">
                                                    {p.nama_peminjam?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="font-medium text-[#003527]">
                                                    {p.nama_peminjam}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-[#404944]">
                                            {new Date(
                                                p.tanggal_pinjam,
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="py-3 text-[#404944]">
                                            {p.tanggal_kembali ? (
                                                new Date(
                                                    p.tanggal_kembali,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                            ) : (
                                                <span className="text-slate-300">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
                                                ${
                                                    p.status === "Dipinjam"
                                                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[12px]">
                                                    {p.status === "Dipinjam"
                                                        ? "outbox"
                                                        : "assignment_return"}
                                                </span>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoBox({ icon, label, value }) {
    return (
        <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3">
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
