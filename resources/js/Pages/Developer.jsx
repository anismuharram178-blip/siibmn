import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { TiltCard } from "@/Components/TiltCard";
import { useState, useEffect, useRef } from "react";

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                obs.disconnect();
                let start = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    start += step;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(timer);
                    } else setCount(start);
                }, 30);
            },
            { threshold: 0.5 },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

/* ── Typing text ── */
function TypingText({ texts }) {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    const [del, setDel] = useState(false);

    useEffect(() => {
        const current = texts[idx];
        const timer = setTimeout(
            () => {
                if (!del) {
                    setText(current.slice(0, text.length + 1));
                    if (text.length + 1 === current.length)
                        setTimeout(() => setDel(true), 1400);
                } else {
                    setText(current.slice(0, text.length - 1));
                    if (text.length - 1 === 0) {
                        setDel(false);
                        setIdx((idx + 1) % texts.length);
                    }
                }
            },
            del ? 40 : 80,
        );
        return () => clearTimeout(timer);
    }, [text, del, idx, texts]);

    return (
        <span className="text-emerald-400">
            {text}
            <span className="animate-pulse">|</span>
        </span>
    );
}

/* ── Pulse ring ── */
function PulseRings() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="absolute rounded-full border border-emerald-400/20"
                    style={{
                        width: `${i * 80 + 100}px`,
                        height: `${i * 80 + 100}px`,
                        animation: `ping ${i * 0.8 + 1.5}s cubic-bezier(0,0,0.2,1) infinite`,
                        animationDelay: `${i * 0.4}s`,
                    }}
                />
            ))}
        </div>
    );
}

const SKILLS = [
    {
        name: "Laravel",
        icon: "code",
        level: 80,
        color: "from-red-500 to-orange-400",
    },
    {
        name: "React",
        icon: "hub",
        level: 75,
        color: "from-cyan-400 to-blue-500",
    },
    {
        name: "MySQL",
        icon: "storage",
        level: 85,
        color: "from-blue-500 to-indigo-500",
    },
    {
        name: "Tailwind",
        icon: "style",
        level: 80,
        color: "from-teal-400 to-emerald-500",
    },
    {
        name: "PHP",
        icon: "terminal",
        level: 78,
        color: "from-violet-500 to-purple-600",
    },
    {
        name: "JavaScript",
        icon: "javascript",
        level: 70,
        color: "from-yellow-400 to-amber-500",
    },
];

const STATS = [
    { label: "NIM", value: 2521055, suffix: "", icon: "school" },
    { label: "Angkatan", value: 2021, suffix: "", icon: "calendar_today" },
    { label: "Projects", value: 5, suffix: "+", icon: "folder_open" },
    { label: "Cups of ☕", value: 999, suffix: "+", icon: "local_cafe" },
];

const FUN_FACTS = [
    { icon: "🍞", label: "Founder", desc: "Bisnis Roti Kukus" },
    { icon: "⚜️", label: "Pramuka", desc: "Guru Pramuka Aktif" },
    { icon: "🏙️", label: "Asal", desc: "Jakarta" },
    { icon: "🎓", label: "Kampus", desc: "UIN Bukittinggi" },
];

export default function Developer() {
    return (
        <AuthenticatedLayout header="Developer">
            <Head title="Developer" />

            <style>{`
                @keyframes ping {
                    75%, 100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .shimmer-text {
                    background: linear-gradient(90deg, #6ee7b7, #34d399, #a7f3d0, #34d399, #6ee7b7);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 4s linear infinite;
                }
                .skill-bar { transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }
                .bento-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .bento-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(6,78,59,0.15); }
            `}</style>

            <div className="space-y-6 pb-8">
                {/* ── PAGE HEADER ── */}
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#003527]">
                        Developer
                    </h2>
                    <p className="text-[#404944] mt-1">
                        The mind behind SIIBMN.
                    </p>
                </div>

                {/* ══════════════════════════════════════
                    BENTO GRID
                ══════════════════════════════════════ */}
                <div className="grid grid-cols-12 gap-4 auto-rows-auto">
                    {/* ── CARD 1: Hero Profile (col 8, tall) ── */}
                    <TiltCard
                        className="col-span-12 md:col-span-8 bg-[#064E3B] rounded-2xl overflow-hidden relative bento-hover"
                        style={{ minHeight: "340px" }}
                    >
                        {/* BG pattern */}
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                        <div
                            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
                            style={{
                                background:
                                    "radial-gradient(circle, #34d399, transparent 70%)",
                                transform: "translate(30%, -30%)",
                            }}
                        />

                        <PulseRings />

                        <div className="relative z-10 p-8 flex items-center gap-8 h-full">
                            {/* Avatar */}
                            <div className="flex-shrink-0 relative">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl">
                                    <img
                                        src="/images/anis.png"
                                        alt="M. Anis Muharram"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextSibling.style.display =
                                                "flex";
                                        }}
                                    />
                                    <div className="w-full h-full bg-emerald-800 hidden items-center justify-center text-4xl font-black text-white">
                                        AM
                                    </div>
                                </div>
                                {/* Online dot */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-[#064E3B] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold">
                                        Developer · SIIBMN v1.0
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black text-white leading-tight mb-1">
                                    M. Anis Muharram
                                </h1>
                                <div className="text-sm text-emerald-200/70 mb-3 h-6">
                                    <TypingText
                                        texts={[
                                            "Full-Stack Developer",
                                            "Laravel Enthusiast",
                                            "React Developer",
                                            "Pramuka Instructor",
                                            "Roti Kukus Founder 🍞",
                                        ]}
                                    />
                                </div>
                                <p className="text-white/50 text-xs leading-relaxed max-w-sm">
                                    Mahasiswa PTIK dengan NIM 2521055 Angkatan
                                    2021 · UIN Sjech M. Djamil Djambek
                                    Bukittinggi. Membangun SIIBMN sebagai Tugas
                                    Akhir Skripsi.
                                </p>

                                {/* Contact chips */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <a
                                        href="mailto:anismuharram178@gmail.com"
                                        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            mail
                                        </span>
                                        anismuharram178@gmail.com
                                    </a>
                                    <a
                                        href="https://wa.me/6287700550514"
                                        target="_blank"
                                        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            phone
                                        </span>
                                        +62 877-0055-0514
                                    </a>
                                    <a
                                        href="https://instagram.com/anismuharram_17"
                                        target="_blank"
                                        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            photo_camera
                                        </span>
                                        @anismuharram_17
                                    </a>
                                </div>
                            </div>
                        </div>
                    </TiltCard>

                    {/* ── CARD 2: Stats (col 4, tall) ── */}
                    <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
                        {STATS.map((s, i) => (
                            <TiltCard
                                key={i}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between bento-hover"
                            >
                                <span className="material-symbols-outlined text-[#064E3B] text-[22px]">
                                    {s.icon}
                                </span>
                                <div>
                                    <p className="text-3xl font-black text-[#003527]">
                                        <Counter
                                            target={s.value}
                                            suffix={s.suffix}
                                        />
                                    </p>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-0.5">
                                        {s.label}
                                    </p>
                                </div>
                            </TiltCard>
                        ))}
                    </div>

                    {/* ── CARD 3: Skripsi (col 5) ── */}
                    <TiltCard className="col-span-12 md:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 bento-hover">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#b0f0d6] flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[#003527] text-[24px]">
                                    menu_book
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                    Judul Skripsi
                                </p>
                                <h3 className="font-black text-[#003527] text-sm leading-snug">
                                    Perancangan Sistem Informasi Inventaris
                                    Barang Milik Negara di Universitas Islam
                                    Negeri Sjech M. Djamil Djambek Bukittinggi
                                </h3>
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#064E3B] flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                GD
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#003527]">
                                    Gusnita Darmawati, M.Kom.
                                </p>
                                <p className="text-[10px] text-slate-400">
                                    Dosen Pembimbing
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* ── CARD 4: Fun Facts (col 7) ── */}
                    <TiltCard className="col-span-12 md:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 bento-hover">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                            Fun Facts
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {FUN_FACTS.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-slate-50 hover:bg-[#b0f0d6]/30 rounded-xl p-3 transition-colors"
                                >
                                    <span className="text-2xl">{f.icon}</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                            {f.label}
                                        </p>
                                        <p className="text-sm font-bold text-[#003527]">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TiltCard>

                    {/* ── CARD 5: Skills (col 8) ── */}
                    <TiltCard className="col-span-12 md:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 bento-hover">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">
                            Tech Stack & Skills
                        </p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {SKILLS.map((skill, i) => (
                                <SkillBar
                                    key={i}
                                    skill={skill}
                                    delay={i * 100}
                                />
                            ))}
                        </div>
                    </TiltCard>

                    {/* ── CARD 6: Identitas Akademik (col 4) ── */}
                    <TiltCard
                        className="col-span-12 md:col-span-4 bg-[#064E3B] rounded-2xl overflow-hidden relative bento-hover"
                        style={{ minHeight: "220px" }}
                    >
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }}
                        />
                        <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <img
                                        src="/images/logo-uin.png"
                                        alt="UIN"
                                        className="w-8 h-8 object-contain opacity-90"
                                        onError={(e) =>
                                            (e.target.style.display = "none")
                                        }
                                    />
                                    <p className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-widest">
                                        Identitas Akademik
                                    </p>
                                </div>
                                <div className="space-y-2.5">
                                    {[
                                        {
                                            label: "Program Studi",
                                            value: "Pendidikan Teknologi Informasi",
                                        },
                                        {
                                            label: "Semester",
                                            value: "Sepuluh (X)",
                                        },
                                        { label: "Angkatan", value: "2021" },
                                        { label: "Asal", value: "Jakarta" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center border-b border-white/10 pb-2"
                                        >
                                            <span className="text-emerald-300/60 text-xs">
                                                {item.label}
                                            </span>
                                            <span className="text-white text-xs font-bold">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="shimmer-text text-lg font-black">
                                    PTIK · 2021
                                </p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* ── CARD 7: Quote (col 12) ── */}
                    <TiltCard className="col-span-12 bg-gradient-to-r from-[#022c1e] via-[#064E3B] to-[#0a6b50] rounded-2xl p-8 text-center bento-hover relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                            }}
                        />
                        <div className="relative z-10">
                            <span className="text-5xl text-emerald-400/40 font-serif leading-none">
                                "
                            </span>
                            <p className="text-white/80 text-lg font-medium italic mt-2 max-w-2xl mx-auto leading-relaxed">
                                Membangun sistem yang bermanfaat untuk
                                institusi, sambil terus belajar dan berkembang —
                                itulah esensi dari setiap baris kode yang saya
                                tulis.
                            </p>
                            <span className="text-5xl text-emerald-400/40 font-serif leading-none">
                                "
                            </span>
                            <p className="text-emerald-400 text-sm font-bold mt-3">
                                — M. Anis Muharram
                            </p>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ── Skill Bar Component ── */
function SkillBar({ skill, delay }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                obs.disconnect();
                setTimeout(() => setWidth(skill.level), delay);
            },
            { threshold: 0.3 },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [skill.level, delay]);

    return (
        <div ref={ref}>
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#064E3B]">
                        {skill.icon}
                    </span>
                    <span className="text-sm font-bold text-[#003527]">
                        {skill.name}
                    </span>
                </div>
                <span className="text-xs font-black text-[#064E3B]">
                    {width}%
                </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} skill-bar`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}
