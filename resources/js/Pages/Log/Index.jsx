import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { TiltCard } from "@/Components/TiltCard";

const AKSI_CONFIG = {
    "Tambah Barang": {
        color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        icon: "add_circle",
        dot: "bg-emerald-500",
    },
    "Edit Barang": {
        color: "bg-amber-100 text-amber-700 border border-amber-200",
        icon: "edit",
        dot: "bg-amber-500",
    },
    "Hapus Barang": {
        color: "bg-red-100 text-red-600 border border-red-200",
        icon: "delete",
        dot: "bg-red-500",
    },
    "Catat Peminjaman": {
        color: "bg-blue-100 text-blue-700 border border-blue-200",
        icon: "outbox",
        dot: "bg-blue-500",
    },
    "Proses Pengembalian": {
        color: "bg-purple-100 text-purple-700 border border-purple-200",
        icon: "assignment_return",
        dot: "bg-purple-500",
    },
};

const DEFAULT_CONFIG = {
    color: "bg-slate-100 text-slate-600",
    icon: "history",
    dot: "bg-slate-400",
};

export default function Index({ logs, filters, aksiList }) {
    const [aksi, setAksi] = useState(filters.aksi || "");
    const [search, setSearch] = useState(filters.search || "");

    const applyFilter = () => {
        router.get(
            route("log.index"),
            { aksi, search },
            { preserveState: true, replace: true },
        );
    };
    const resetFilter = () => {
        setAksi("");
        setSearch("");
        router.get(route("log.index"));
    };

    return (
        <AuthenticatedLayout header="Activity Logs">
            <Head title="Activity Logs" />
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Activity Logs
                    </h2>
                    <p className="text-[#404944] mt-1">
                        Complete audit trail of all administrator actions.
                    </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(AKSI_CONFIG).map(([label, cfg]) => (
                        <TiltCard
                            key={label}
                            className="bg-white rounded-xl border border-slate-100 shadow-[0_10px_20px_rgba(0,0,0,0.04)] p-4 cursor-pointer hover:border-emerald-200 transition-all"
                            onClick={() => {
                                setAksi(label);
                                router.get(
                                    route("log.index"),
                                    { aksi: label },
                                    { preserveState: true },
                                );
                            }}
                        >
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${cfg.color}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {cfg.icon}
                                </span>
                            </div>
                            <p className="text-xs font-semibold text-[#404944] leading-tight">
                                {label}
                            </p>
                        </TiltCard>
                    ))}
                </div>

                {/* Filter */}
                <TiltCard className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-5">
                    <div className="flex flex-wrap gap-3 items-end">
                        <div className="min-w-[180px]">
                            <label className="text-xs font-semibold text-[#404944] mb-1.5 block uppercase tracking-wide">
                                Action Type
                            </label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                value={aksi}
                                onChange={(e) => setAksi(e.target.value)}
                            >
                                <option value="">All Actions</option>
                                {aksiList.map((a) => (
                                    <option key={a} value={a}>
                                        {a}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className="text-xs font-semibold text-[#404944] mb-1.5 block uppercase tracking-wide">
                                Search Description
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    search
                                </span>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="Search activity description..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && applyFilter()
                                    }
                                />
                            </div>
                        </div>
                        <button
                            onClick={applyFilter}
                            className="bg-[#064E3B] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0a6b50] transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                filter_list
                            </span>
                            Filter
                        </button>
                        <button
                            onClick={resetFilter}
                            className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </TiltCard>

                {/* Timeline */}
                <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-[#003527] text-lg">
                            Timeline
                        </h3>
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                            {logs.total} total records
                        </span>
                    </div>

                    {logs.data.length === 0 ? (
                        <div className="text-center py-16">
                            <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">
                                history
                            </span>
                            <p className="text-slate-400 font-medium">
                                No activity logs found
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {logs.data.map((log, i) => {
                                const cfg =
                                    AKSI_CONFIG[log.aksi] ?? DEFAULT_CONFIG;
                                return (
                                    <div
                                        key={log.id}
                                        className="flex gap-4 group"
                                    >
                                        {/* Timeline line */}
                                        <div className="flex flex-col items-center flex-shrink-0 w-10">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 border-white shadow-md mt-4 flex-shrink-0 ${cfg.dot}`}
                                            />
                                            {i < logs.data.length - 1 && (
                                                <div className="w-px flex-1 bg-slate-100 min-h-[24px]" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-5">
                                            <div className="bg-slate-50 group-hover:bg-emerald-50/50 rounded-xl p-4 transition-colors border border-transparent group-hover:border-emerald-100">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">
                                                            {cfg.icon}
                                                        </span>
                                                        {log.aksi}
                                                    </span>
                                                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide ml-auto">
                                                        {new Date(
                                                            log.waktu,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-[#404944] leading-relaxed">
                                                    {log.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {logs.links && (
                        <div className="flex gap-1 pt-6 border-t border-slate-100 justify-end">
                            {logs.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                                        ${link.active ? "bg-[#064E3B] text-white" : "text-slate-500 hover:bg-slate-100 border border-slate-200"}
                                        disabled:opacity-30`}
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
