import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // State untuk melacak posisi mouse guna efek cahaya
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login — SIIBMN" />

            <div
                className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                {/* Background tetap sama */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#022c1e] via-[#064E3B] to-[#0a6b50]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <style>{`
                    @keyframes fadeSlideUp {
                        from { opacity:0; transform: translateY(24px); }
                        to   { opacity:1; transform: translateY(0);    }
                    }
                    .login-card { animation: fadeSlideUp 0.6s ease-out both; }
                    .input-glass {
                        background: rgba(255,255,255,0.07) !important;
                        border: 1px solid rgba(255,255,255,0.15) !important;
                        color: white !important;
                        border-radius: 12px;
                        padding: 12px 16px 12px 44px;
                        width: 100%;
                        font-size: 14px;
                        outline: none;
                        transition: all 0.2s ease;
                        backdrop-filter: blur(4px);
                    }
                    .input-glass:focus {
                        border-color: rgba(110,231,183,0.6) !important;
                        box-shadow: 0 0 0 4px rgba(52,211,153,0.1);
                    }
                    .input-group:focus-within .icon-label { color: #6ee7b7 !important; opacity: 1; }
                `}</style>

                {/* Main card dengan Mouse Event */}
                <div
                    className="login-card relative w-full max-w-md z-10 group"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setOpacity(1)}
                    onMouseLeave={() => setOpacity(0)}
                >
                    <div
                        className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
                        style={{
                            background: "rgba(255,255,255,0.07)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                        }}
                    >
                        {/* EFEK CAHAYA LEMBUT (Spotlight) */}
                        <div
                            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                            style={{
                                opacity: opacity,
                                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.15), transparent 40%)`,
                            }}
                        />

                        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 relative z-10" />

                        <div className="px-8 py-10 sm:px-10 relative z-10">
                            {/* Logo Section */}
                            <div className="text-center mb-10">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 bg-emerald-400 scale-125" />
                                        <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                            <img
                                                src="/images/logo-siibmn.png"
                                                alt="Logo"
                                                className="w-14 h-14 object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                                    SIIBMN
                                </h1>
                                <p className="text-emerald-300/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    UIN Sjech M. Djamil Djambek Bukittinggi
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={submit} className="space-y-5">
                                <div className="input-group">
                                    <label className="block text-[10px] font-black text-emerald-300/60 uppercase tracking-[0.15em] mb-2 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="icon-label material-symbols-outlined absolute left-4 text-white/30 text-[20px] pointer-events-none">
                                            mail
                                        </span>
                                        <input
                                            type="email"
                                            className="input-glass"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="admin@uinbukittinggi.ac.id"
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="block text-[10px] font-black text-emerald-300/60 uppercase tracking-[0.15em] mb-2 ml-1">
                                        Password
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className="icon-label material-symbols-outlined absolute left-4 text-white/30 text-[20px] pointer-events-none">
                                            lock
                                        </span>
                                        <input
                                            type="password"
                                            className="input-glass"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center pt-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer group/check">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="peer appearance-none w-5 h-5 rounded-md border border-white/20 bg-white/5 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 pointer-events-none">
                                                check
                                            </span>
                                        </div>
                                        <span className="text-xs text-white/50 group-hover/check:text-white/80 transition-colors">
                                            Keep me signed in
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-sm transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-900/20"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #34d399, #059669)",
                                        color: "white",
                                    }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {processing ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[18px]">
                                                    login
                                                </span>
                                                <span>Sign In to SIIBMN</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">
                                    SIIBMN v1.0 · Secure Access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
