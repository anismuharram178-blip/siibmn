import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { TiltCard } from "@/Components/TiltCard";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const AKSI_STYLE = {
    "Tambah Barang": "bg-emerald-100 text-emerald-700",
    "Edit Barang": "bg-yellow-100 text-yellow-700",
    "Hapus Barang": "bg-red-100 text-red-700",
    "Catat Peminjaman": "bg-amber-100 text-amber-700",
    "Proses Pengembalian": "bg-blue-100 text-blue-700",
};

const STAT_CARDS = [
    {
        key: "total",
        label: "Total Managed Items",
        icon: "inventory_2",
        badge: "GLOBAL",
        badgeColor: "bg-slate-100 text-slate-500",
        valueColor: "text-[#003527]",
        iconBg: "bg-[#b0f0d6] text-[#003527]",
    },
    {
        key: "tersedia",
        label: "Available Assets",
        icon: "check_circle",
        badge: "STABLE",
        badgeColor: "bg-emerald-50 text-emerald-700",
        valueColor: "text-emerald-700",
        iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
        key: "dipinjam",
        label: "Currently Borrowed",
        icon: "outbox",
        badge: "ACTIVE",
        badgeColor: "bg-amber-50 text-amber-700",
        valueColor: "text-amber-700",
        iconBg: "bg-amber-50 text-amber-600",
    },
    {
        key: "rusak",
        label: "Damaged / In Repair",
        icon: "report_problem",
        badge: "CRITICAL",
        badgeColor: "bg-red-50 text-red-600",
        valueColor: "text-red-600",
        iconBg: "bg-red-50 text-red-500",
    },
];

export default function Dashboard({ stats, aktivitasTerbaru, grafikData }) {
    return (
        <AuthenticatedLayout header="Resource Overview">
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Page Intro */}
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Resource Overview
                    </h2>
                    <p className="text-[#404944] mt-1">
                        Welcome back. Here is the current status of state-owned
                        assets (BMN).
                    </p>
                </div>

                {/* Stat Cards - Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STAT_CARDS.map((card) => (
                        <TiltCard
                            key={card.key}
                            className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex flex-col justify-between h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className={`material-symbols-outlined p-2 rounded-lg ${card.iconBg}`}
                                >
                                    {card.icon}
                                </span>
                                <span
                                    className={`text-[10px] font-bold px-2 py-1 rounded-full ${card.badgeColor}`}
                                >
                                    {card.badge}
                                </span>
                            </div>
                            <div>
                                <p
                                    className={`text-3xl font-bold ${card.valueColor}`}
                                >
                                    {stats[card.key]}
                                </p>
                                <p className="text-sm text-[#404944] mt-1">
                                    {card.label}
                                </p>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* Middle Row: Grafik + Aktivitas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grafik */}
                    <TiltCard className="lg:col-span-2 bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-[#003527]">
                                Loan Activity Trend
                            </h3>
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                                {new Date().getFullYear()}
                            </span>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart
                                data={grafikData}
                                margin={{
                                    top: 0,
                                    right: 10,
                                    left: -20,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f4f0"
                                />
                                <XAxis
                                    dataKey="bulan"
                                    tick={{ fontSize: 11, fill: "#404944" }}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#404944" }}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    name="Peminjaman"
                                    fill="#064E3B"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </TiltCard>

                    {/* Feed Aktivitas */}
                    <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-[#003527]">
                                Recent Activity
                            </h3>
                            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-[#003527]">
                                more_vert
                            </span>
                        </div>
                        <div className="space-y-5">
                            {aktivitasTerbaru.length === 0 && (
                                <p className="text-slate-400 text-sm">
                                    Belum ada aktivitas.
                                </p>
                            )}
                            {aktivitasTerbaru.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex gap-3 items-start"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#b0f0d6] flex items-center justify-center text-[#003527] flex-shrink-0">
                                        <span className="material-symbols-outlined text-[16px]">
                                            {log.aksi.includes("Tambah")
                                                ? "add_circle"
                                                : log.aksi.includes("Edit")
                                                  ? "edit"
                                                  : log.aksi.includes("Hapus")
                                                    ? "delete"
                                                    : log.aksi.includes(
                                                            "Pengembalian",
                                                        )
                                                      ? "assignment_return"
                                                      : "outbox"}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#003527]">
                                            {log.aksi}
                                        </p>
                                        <p className="text-xs text-[#404944] leading-snug">
                                            {log.deskripsi}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 uppercase font-bold tracking-wide">
                                            {new Date(log.waktu).toLocaleString(
                                                "id-ID",
                                                {
                                                    dateStyle: "short",
                                                    timeStyle: "short",
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Progress + Quick Access */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Availability Rate */}
                    <TiltCard className="bg-[#064E3B] rounded-xl shadow-lg p-8 text-white">
                        <p className="text-sm text-emerald-100/70 mb-1">
                            Availability Rate
                        </p>
                        <p className="text-5xl font-black">
                            {stats.total > 0
                                ? Math.round(
                                      (stats.tersedia / stats.total) * 100,
                                  )
                                : 0}
                            %
                        </p>
                        <p className="text-xs text-emerald-100/60 mt-2">
                            {stats.tersedia} of {stats.total} assets available
                        </p>
                        <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-emerald-400"
                                style={{
                                    width:
                                        stats.total > 0
                                            ? `${(stats.tersedia / stats.total) * 100}%`
                                            : "0%",
                                }}
                            />
                        </div>
                    </TiltCard>

                    {/* Distribusi */}
                    <TiltCard className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                        <p className="text-sm text-[#404944] font-semibold mb-4">
                            Status Distribution
                        </p>
                        {[
                            {
                                label: "Available",
                                val: stats.tersedia,
                                color: "bg-emerald-500",
                            },
                            {
                                label: "Borrowed",
                                val: stats.dipinjam,
                                color: "bg-amber-500",
                            },
                            {
                                label: "Damaged",
                                val: stats.rusak,
                                color: "bg-red-500",
                            },
                        ].map((s) => (
                            <div key={s.label} className="mb-3">
                                <div className="flex justify-between text-xs text-[#404944] mb-1">
                                    <span>{s.label}</span>
                                    <span className="font-semibold">
                                        {s.val}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${s.color} transition-all duration-700`}
                                        style={{
                                            width:
                                                stats.total > 0
                                                    ? `${(s.val / stats.total) * 100}%`
                                                    : "0%",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </TiltCard>

                    {/* Quick Access */}
                    <TiltCard className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                        <p className="text-sm text-[#404944] font-semibold mb-4">
                            Quick Actions
                        </p>
                        <div className="space-y-3">
                            <a
                                href="/barang/create"
                                className="flex items-center gap-3 bg-[#064E3B] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#0a6b50] transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    add_circle
                                </span>
                                Add New Asset
                            </a>
                            <a
                                href="/peminjaman/create"
                                className="flex items-center gap-3 bg-amber-500 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-amber-600 transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    outbox
                                </span>
                                Record Loan
                            </a>
                            <a
                                href="/laporan"
                                className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    analytics
                                </span>
                                Generate Report
                            </a>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
