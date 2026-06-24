import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { TiltCard } from "@/Components/TiltCard";
import { FilterChips } from "@/Components/FilterChips";

const STATUS_STYLE = {
    Dipinjam: "bg-amber-50 text-amber-700 border border-amber-200",
    Dikembalikan: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const STATUS_OPTIONS = [
    { value: "Dipinjam", label: "Dipinjam", icon: "outbox" },
    { value: "Dikembalikan", label: "Dikembalikan", icon: "assignment_return" },
];

export default function Index({ peminjaman, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    const applyFilter = (overrides = {}) => {
        router.get(
            route("peminjaman.index"),
            { search, status, ...overrides },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AuthenticatedLayout header="Loan Management">
            <Head title="Loan Management" />
            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                            Loan Management
                        </h2>
                        <p className="text-[#404944] mt-1">
                            Track and manage all asset borrowing transactions.
                        </p>
                    </div>

                    {/* BAGIAN YANG DIPERBARUI: Penambahan Tombol Check Availability */}
                    <div className="flex gap-3">
                        <Link
                            href={route("peminjaman.checkAvailability")}
                            className="flex items-center gap-2 bg-emerald-50 text-[#064E3B] border border-emerald-200 px-5 py-3 rounded-xl hover:bg-emerald-100 transition-all font-semibold"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                event_available
                            </span>
                            Check Availability
                        </Link>
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
                </div>

                {/* Search */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[22px]">
                        search
                    </span>
                    <input
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 shadow-sm transition-all"
                        placeholder="Search by borrower name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applyFilter()}
                    />
                    {search && (
                        <button
                            onClick={() => {
                                setSearch("");
                                applyFilter({ search: "" });
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                close
                            </span>
                        </button>
                    )}
                </div>

                {/* Status Chips */}
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Filter by Status
                    </p>
                    <FilterChips
                        options={STATUS_OPTIONS}
                        value={status}
                        onChange={(val) => {
                            setStatus(val);
                            applyFilter({ status: val });
                        }}
                        allLabel="All Transactions"
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h4 className="font-semibold text-[#003527] text-sm">
                            Loan Records
                            <span className="ml-2 text-xs text-slate-400 font-normal">
                                ({peminjaman.total} transactions)
                            </span>
                        </h4>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#064E3B] text-white">
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Borrower
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Asset
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Loan Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Return Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {peminjaman.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-16"
                                    >
                                        <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">
                                            swap_horiz
                                        </span>
                                        <p className="text-slate-400 font-medium">
                                            No loan records found
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                peminjaman.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-slate-400 text-xs">
                                            {peminjaman.from + i}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#064E3B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    {item.nama_peminjam?.[0]?.toUpperCase()}
                                                </div>
                                                <span className="font-semibold text-[#003527]">
                                                    {item.nama_peminjam}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#404944]">
                                            {item.barang?.nama_barang ?? "—"}
                                        </td>
                                        <td className="px-6 py-4 text-[#404944]">
                                            {new Date(
                                                item.tanggal_pinjam,
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-[#404944]">
                                            {item.tanggal_kembali ? (
                                                new Date(
                                                    item.tanggal_kembali,
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
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status]}`}
                                            >
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {item.status === "Dipinjam"
                                                        ? "outbox"
                                                        : "assignment_return"}
                                                </span>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                href={route(
                                                    "peminjaman.show",
                                                    item.id,
                                                )}
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003527] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">
                                                    open_in_new
                                                </span>
                                                {item.status === "Dipinjam"
                                                    ? "Process Return"
                                                    : "View Detail"}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {peminjaman.links && (
                        <div className="flex gap-1 px-6 py-4 border-t border-slate-100 justify-end">
                            {peminjaman.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                                        ${link.active ? "bg-[#064E3B] text-white" : "text-slate-500 hover:bg-slate-100 border border-slate-200"} disabled:opacity-30`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
