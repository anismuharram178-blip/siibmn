import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { TiltCard } from "@/Components/TiltCard";
import { FilterChips } from "@/Components/FilterChips";
import { CustomSelect } from "@/Components/CustomSelect";

const STATUS_STYLE = {
    Tersedia: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Dipinjam: "bg-amber-50 text-amber-700 border border-amber-200",
    Rusak: "bg-red-50 text-red-600 border border-red-200",
};
const KONDISI_STYLE = {
    Baik: "bg-blue-50 text-blue-700",
    "Rusak Ringan": "bg-yellow-50 text-yellow-700",
    "Rusak Berat": "bg-red-50 text-red-600",
};
const STATUS_ICON = {
    Tersedia: "check_circle",
    Dipinjam: "outbox",
    Rusak: "report_problem",
};

const KATEGORI_OPTIONS = [
    { value: "Kendaraan", label: "Kendaraan", icon: "directions_car" },
    { value: "Fasilitas", label: "Fasilitas", icon: "apartment" },
    { value: "Elektronik", label: "Elektronik", icon: "devices" },
    { value: "Furniture", label: "Furniture", icon: "chair" },
    { value: "Lainnya", label: "Lainnya", icon: "inventory_2" },
];

const STATUS_OPTIONS = [
    {
        value: "Tersedia",
        label: "Tersedia",
        icon: "check_circle",
        color: "text-emerald-500",
    },
    {
        value: "Dipinjam",
        label: "Dipinjam",
        icon: "outbox",
        color: "text-amber-500",
    },
    {
        value: "Rusak",
        label: "Rusak",
        icon: "report_problem",
        color: "text-red-500",
    },
];

export default function Index({ barang, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [kategori, setKategori] = useState(filters.kategori || "");
    const [status, setStatus] = useState(filters.status || "");

    const applyFilter = (overrides = {}) => {
        router.get(
            route("barang.index"),
            {
                search,
                kategori,
                status,
                ...overrides,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = (id, nama) => {
        if (confirm(`Hapus barang "${nama}"?`)) {
            router.delete(route("barang.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout header="Asset Inventory">
            <Head title="Asset Inventory" />
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                            Asset Inventory
                        </h2>
                        <p className="text-[#404944] mt-1">
                            Manage university property, facilities, and
                            transportation.
                        </p>
                    </div>
                    <Link
                        href={route("barang.create")}
                        className="flex items-center gap-2 bg-[#064E3B] text-white px-6 py-3 rounded-xl hover:bg-[#0a6b50] transition-all font-semibold shadow-lg active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            add
                        </span>
                        Add New Item
                    </Link>
                </div>

                {/* Search bar */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[22px]">
                        search
                    </span>
                    <input
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 shadow-sm transition-all"
                        placeholder="Search for items like 'Hiace' or 'Gedung S1'..."
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

                {/* Filter Row */}
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Kategori chips */}
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Category
                        </p>
                        <FilterChips
                            options={KATEGORI_OPTIONS}
                            value={kategori}
                            onChange={(val) => {
                                setKategori(val);
                                applyFilter({ kategori: val });
                            }}
                            allLabel="All Items"
                        />
                    </div>

                    {/* Status select */}
                    <div className="w-44 flex-shrink-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Status
                        </p>
                        <CustomSelect
                            value={status}
                            onChange={(val) => {
                                setStatus(val);
                                applyFilter({ status: val });
                            }}
                            options={STATUS_OPTIONS}
                            placeholder="All Status"
                        />
                    </div>
                </div>

                {/* Active filter tags */}
                {(search || kategori || status) && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-400 font-semibold">
                            Active filters:
                        </span>
                        {search && (
                            <span className="inline-flex items-center gap-1.5 bg-[#064E3B]/10 text-[#003527] text-xs font-semibold px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">
                                    search
                                </span>
                                "{search}"
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        applyFilter({ search: "" });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px] hover:text-red-500">
                                        close
                                    </span>
                                </button>
                            </span>
                        )}
                        {kategori && (
                            <span className="inline-flex items-center gap-1.5 bg-[#064E3B]/10 text-[#003527] text-xs font-semibold px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">
                                    category
                                </span>
                                {kategori}
                                <button
                                    onClick={() => {
                                        setKategori("");
                                        applyFilter({ kategori: "" });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px] hover:text-red-500">
                                        close
                                    </span>
                                </button>
                            </span>
                        )}
                        {status && (
                            <span className="inline-flex items-center gap-1.5 bg-[#064E3B]/10 text-[#003527] text-xs font-semibold px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">
                                    radio_button_checked
                                </span>
                                {status}
                                <button
                                    onClick={() => {
                                        setStatus("");
                                        applyFilter({ status: "" });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px] hover:text-red-500">
                                        close
                                    </span>
                                </button>
                            </span>
                        )}
                        <button
                            onClick={() => {
                                setSearch("");
                                setKategori("");
                                setStatus("");
                                router.get(route("barang.index"));
                            }}
                            className="text-xs text-red-500 font-semibold hover:underline ml-1"
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h4 className="font-semibold text-[#003527] text-sm">
                            Complete Inventory List
                            <span className="ml-2 text-xs text-slate-400 font-normal">
                                ({barang.total} items)
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
                                    Item
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                                    Condition
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
                            {barang.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-16"
                                    >
                                        <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">
                                            inventory_2
                                        </span>
                                        <p className="text-slate-400 font-medium">
                                            No items found
                                        </p>
                                        <p className="text-slate-300 text-xs mt-1">
                                            Try adjusting your search or filter
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                barang.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/80 transition-colors group"
                                    >
                                        <td className="px-6 py-4 text-slate-400 text-xs">
                                            {barang.from + i}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-[#b0f0d6] flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-[#003527] text-[18px]">
                                                        {item.kategori ===
                                                        "Kendaraan"
                                                            ? "directions_car"
                                                            : item.kategori ===
                                                                "Elektronik"
                                                              ? "devices"
                                                              : item.kategori ===
                                                                  "Fasilitas"
                                                                ? "apartment"
                                                                : "inventory_2"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#003527]">
                                                        {item.nama_barang}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5">
                                                        {item.deskripsi?.slice(
                                                            0,
                                                            40,
                                                        ) || "—"}
                                                        {item.deskripsi
                                                            ?.length > 40
                                                            ? "..."
                                                            : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-[#404944] bg-slate-100 px-2.5 py-1 rounded-full">
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#404944] text-sm">
                                            {item.lokasi}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${KONDISI_STYLE[item.kondisi]}`}
                                            >
                                                {item.kondisi}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[item.status]}`}
                                            >
                                                <span className="material-symbols-outlined text-[14px]">
                                                    {STATUS_ICON[item.status]}
                                                </span>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                <Link
                                                    href={route(
                                                        "barang.show",
                                                        item.id,
                                                    )}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-[#003527] hover:bg-emerald-50 transition-all"
                                                    title="Detail"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        visibility
                                                    </span>
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "barang.edit",
                                                        item.id,
                                                    )}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        edit
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id,
                                                            item.nama_barang,
                                                        )
                                                    }
                                                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    title="Hapus"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {barang.links && (
                        <div className="flex gap-1 px-6 py-4 border-t border-slate-100 justify-end">
                            {barang.links.map((link, i) => (
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
