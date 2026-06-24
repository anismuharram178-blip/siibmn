import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ barang }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_barang: barang.nama_barang,
        kategori: barang.kategori,
        lokasi: barang.lokasi,
        kondisi: barang.kondisi,
        status: barang.status,
        deskripsi: barang.deskripsi || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("barang.update", barang.id));
    };

    return (
        <AuthenticatedLayout header="Edit Item">
            <Head title="Edit Item" />
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Edit Item
                    </h2>
                    <p className="text-[#404944] mt-1">
                        Update asset information:{" "}
                        <span className="font-semibold text-[#003527]">
                            {barang.nama_barang}
                        </span>
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] border border-slate-100 p-8">
                    <form onSubmit={submit} className="space-y-5">
                        <Field label="Item Name" error={errors.nama_barang}>
                            <input
                                className={inp(errors.nama_barang)}
                                value={data.nama_barang}
                                onChange={(e) =>
                                    setData("nama_barang", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Category" error={errors.kategori}>
                            <select
                                className={inp(errors.kategori)}
                                value={data.kategori}
                                onChange={(e) =>
                                    setData("kategori", e.target.value)
                                }
                            >
                                <option value="">-- Select Category --</option>
                                <option>Kendaraan</option>
                                <option>Fasilitas</option>
                                <option>Elektronik</option>
                                <option>Furniture</option>
                                <option>Lainnya</option>
                            </select>
                        </Field>
                        <Field label="Location" error={errors.lokasi}>
                            <input
                                className={inp(errors.lokasi)}
                                value={data.lokasi}
                                onChange={(e) =>
                                    setData("lokasi", e.target.value)
                                }
                            />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                            <Field label="Condition" error={errors.kondisi}>
                                <select
                                    className={inp(errors.kondisi)}
                                    value={data.kondisi}
                                    onChange={(e) =>
                                        setData("kondisi", e.target.value)
                                    }
                                >
                                    <option>Baik</option>
                                    <option>Rusak Ringan</option>
                                    <option>Rusak Berat</option>
                                </select>
                            </Field>
                            <Field label="Status" error={errors.status}>
                                <select
                                    className={inp(errors.status)}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option>Tersedia</option>
                                    <option>Dipinjam</option>
                                    <option>Rusak</option>
                                </select>
                            </Field>
                        </div>
                        <Field
                            label="Description (optional)"
                            error={errors.deskripsi}
                        >
                            <textarea
                                className={inp(errors.deskripsi)}
                                rows={3}
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                            />
                        </Field>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-[#064E3B] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0a6b50] disabled:opacity-50 transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    save
                                </span>
                                {processing ? "Saving..." : "Update Item"}
                            </button>
                            <Link
                                href={route("barang.index")}
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
