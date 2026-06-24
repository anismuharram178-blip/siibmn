import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { TiltCard } from "@/Components/TiltCard";
import { FilterChips } from "@/Components/FilterChips";
import { CustomSelect } from "@/Components/CustomSelect";

const BULAN_OPTIONS = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
];

const STATUS_STYLE = {
    Dipinjam: "bg-amber-50 text-amber-700 border border-amber-200",
    Dikembalikan: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function Index({ histori, filters, tahunList }) {
    const [bulan, setBulan] = useState(
        filters.bulan ? String(filters.bulan) : "",
    );
    const [tahun, setTahun] = useState(
        filters.tahun
            ? String(filters.tahun)
            : String(new Date().getFullYear()),
    );
    const [barang, setBarang] = useState(filters.barang || "");

    const [expTipe, setExpTipe] = useState("bulanan");
    const [expBulan, setExpBulan] = useState(String(new Date().getMonth() + 1));
    const [expTahun, setExpTahun] = useState(String(new Date().getFullYear()));

    const tahuns = (
        tahunList.length > 0 ? tahunList : [new Date().getFullYear()]
    ).map((t) => ({
        value: String(t),
        label: String(t),
    }));

    const applyFilter = (overrides = {}) => {
        router.get(
            route("laporan.index"),
            { bulan, tahun, barang, ...overrides },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const exportPdf = () => {
        const params = new URLSearchParams({ tipe: expTipe, tahun: expTahun });
        if (expTipe === "bulanan") params.append("bulan", expBulan);
        window.open(
            route("laporan.exportPdf") + "?" + params.toString(),
            "_blank",
        );
    };

    const TIPE_OPTIONS = [
        { value: "bulanan", label: "Monthly Report", icon: "calendar_month" },
        { value: "tahunan", label: "Annual Report", icon: "calendar_today" },
    ];

    return (
        <AuthenticatedLayout header="Reports & History">
            <Head title="Reports & History" />
            <div className="space-y-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Reports & Loan History
                    </h2>
                    <p className="text-[#404944] mt-1">
                        Generate PDF reports and browse all borrowing history.
                    </p>
                </div>

                {/* PDF Generator */}
                <TiltCard className="bg-[#064E3B] rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">
                                picture_as_pdf
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">
                                Generate PDF Report
                            </h3>
                            <p className="text-emerald-100/70 text-xs">
                                Download monthly or annual loan transaction
                                reports
                            </p>
                        </div>
                    </div>

                    {/* Report type chips */}
                    <div className="mb-5">
                        <p className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mb-2">
                            Report Type
                        </p>
                        <div className="flex gap-2">
                            {TIPE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setExpTipe(opt.value)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200
                                        ${
                                            expTipe === opt.value
                                                ? "bg-white text-[#064E3B] shadow-lg"
                                                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[15px]">
                                        {opt.icon}
                                    </span>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 items-end">
                        {expTipe === "bulanan" && (
                            <div className="w-44">
                                <p className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mb-2">
                                    Month
                                </p>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm pr-8"
                                        value={expBulan}
                                        onChange={(e) =>
                                            setExpBulan(e.target.value)
                                        }
                                    >
                                        {BULAN_OPTIONS.map((b) => (
                                            <option
                                                key={b.value}
                                                value={b.value}
                                                className="text-slate-800"
                                            >
                                                {b.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 text-[18px] pointer-events-none">
                                        expand_more
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="w-32">
                            <p className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mb-2">
                                Year
                            </p>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm pr-8"
                                    value={expTahun}
                                    onChange={(e) =>
                                        setExpTahun(e.target.value)
                                    }
                                >
                                    {tahuns.map((t) => (
                                        <option
                                            key={t.value}
                                            value={t.value}
                                            className="text-slate-800"
                                        >
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 text-[18px] pointer-events-none">
                                    expand_more
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={exportPdf}
                            className="flex items-center gap-2 bg-white text-[#064E3B] font-black px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-all shadow-lg active:scale-95 text-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                download
                            </span>
                            Download PDF
                        </button>
                    </div>
                </TiltCard>

                {/* Histori Filter */}
                <div className="bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-6">
                    <h4 className="font-semibold text-[#003527] text-sm mb-4">
                        Filter History
                    </h4>
                    <div className="flex flex-wrap gap-4 items-end">
                        {/* Search asset */}
                        <div className="flex-1 min-w-[200px]">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Asset Name
                            </p>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    search
                                </span>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                                    placeholder="Filter by asset name..."
                                    value={barang}
                                    onChange={(e) => setBarang(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && applyFilter()
                                    }
                                />
                            </div>
                        </div>

                        {/* Bulan */}
                        <div className="w-44">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Month
                            </p>
                            <CustomSelect
                                value={bulan}
                                onChange={(val) => {
                                    setBulan(val);
                                    applyFilter({ bulan: val });
                                }}
                                options={BULAN_OPTIONS}
                                placeholder="All Months"
                            />
                        </div>

                        {/* Tahun */}
                        <div className="w-32">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                Year
                            </p>
                            <CustomSelect
                                value={tahun}
                                onChange={(val) => {
                                    setTahun(val);
                                    applyFilter({ tahun: val });
                                }}
                                options={tahuns}
                                placeholder="All Years"
                            />
                        </div>

                        <button
                            onClick={() => {
                                setBulan("");
                                setTahun(String(new Date().getFullYear()));
                                setBarang("");
                                router.get(route("laporan.index"));
                            }}
                            className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h4 className="font-semibold text-[#003527] text-sm">
                            Transaction History
                            <span className="ml-2 text-xs text-slate-400 font-normal">
                                ({histori.total} records)
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {histori.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-16"
                                    >
                                        <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">
                                            analytics
                                        </span>
                                        <p className="text-slate-400 font-medium">
                                            No history found for this period
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                histori.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-slate-400 text-xs">
                                            {histori.from + i}
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
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {histori.links && (
                        <div className="flex gap-1 px-6 py-4 border-t border-slate-100 justify-end">
                            {histori.links.map((link, i) => (
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
