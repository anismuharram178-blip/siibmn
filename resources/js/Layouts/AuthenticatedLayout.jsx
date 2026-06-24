import { Link, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { href: "dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "barang.index", label: "Inventory", icon: "inventory_2" },
    { href: "peminjaman.index", label: "Loan Management", icon: "swap_horiz" },
    // BARIS YANG DITAMBAHKAN: Menu baru untuk Check Availability
    {
        href: "peminjaman.checkAvailability",
        label: "Check Availability",
        icon: "event_available",
    },
    { href: "laporan.index", label: "Reports", icon: "analytics" },
    { href: "log.index", label: "Activity Logs", icon: "history" },
    { href: "developer", label: "Developer", icon: "code" },
];

function NavItem({ href, label, icon, collapsed }) {
    const routeName = href.replace(".index", ".*");
    const active = route().current(routeName);

    return (
        <Link
            href={route(href)}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-200 text-sm font-medium relative group
                ${
                    active
                        ? "bg-white/10 text-white border-l-4 border-emerald-400"
                        : "text-emerald-100/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }
                ${collapsed ? "justify-center px-0" : "px-6"}`}
        >
            <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                {icon}
            </span>

            {/* Label dengan animasi */}
            <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300
                ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
            >
                {label}
            </span>

            {/* Tooltip saat collapsed */}
            {collapsed && (
                <div
                    className="absolute left-full ml-3 px-3 py-1.5 bg-[#1a3a2a] text-white text-xs font-semibold rounded-lg
                    opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
                >
                    {label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-[#1a3a2a] rotate-45" />
                </div>
            )}
        </Link>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Simpan preferensi collapse ke localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sidebar_collapsed");
        if (saved !== null) setCollapsed(saved === "true");
    }, []);

    const toggleSidebar = () => {
        const next = !collapsed;
        setCollapsed(next);
        localStorage.setItem("sidebar_collapsed", next);
    };

    const sidebarW = collapsed ? "w-[72px]" : "w-64";

    return (
        <div className="min-h-screen bg-[#f8f9ff] font-['Inter'] text-[#0b1c30] antialiased">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen z-40 bg-[#064E3B] flex flex-col
                border-r border-emerald-800/30 shadow-2xl
                transition-all duration-300 ease-in-out
                ${sidebarW}
                ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo area */}
                <div
                    className={`flex items-center border-b border-emerald-800/30 transition-all duration-300
                    ${collapsed ? "px-3 py-6 justify-center" : "px-6 py-6 gap-3"}`}
                >
                    {/* Logo UIN */}
                    <img
                        src="/images/logo-uin.png"
                        alt="Logo UIN"
                        className="w-9 h-9 object-contain flex-shrink-0"
                    />

                    {/* Text logo */}
                    <div
                        className={`overflow-hidden transition-all duration-300
                        ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
                    >
                        <h1 className="text-base font-black tracking-tight text-white leading-none whitespace-nowrap">
                            BMN System
                        </h1>
                        <p className="text-emerald-300/70 text-[10px] uppercase tracking-widest mt-0.5 whitespace-nowrap">
                            UIN Bukittinggi
                        </p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 mt-2 overflow-y-auto overflow-x-hidden">
                    {NAV_ITEMS.map((item) => (
                        <NavItem
                            key={item.href}
                            {...item}
                            collapsed={collapsed}
                        />
                    ))}
                </nav>

                {/* Bottom */}
                <div className="border-t border-emerald-800/30">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        title={collapsed ? "Logout" : undefined}
                        className={`w-full flex items-center gap-3 text-emerald-100/60 hover:text-white
                            hover:bg-white/5 transition-all duration-200 text-sm font-medium py-4
                            ${collapsed ? "justify-center px-0" : "px-6"}`}
                    >
                        <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                            logout
                        </span>
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300
                            ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
                        >
                            Logout
                        </span>
                    </Link>
                </div>
            </aside>

            {/* Top Bar */}
            <header
                className="fixed top-0 right-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center px-6 h-16 transition-all duration-300"
                style={{
                    width: `calc(100% - ${collapsed ? "72px" : "256px"})`,
                }}
            >
                {/* Burger Button */}
                <button
                    onClick={toggleSidebar}
                    className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-[#003527] transition-all mr-4 flex-shrink-0"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <span className="material-symbols-outlined text-[22px]">
                        {collapsed ? "menu_open" : "menu"}
                    </span>
                </button>

                {/* Mobile burger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-all mr-4"
                >
                    <span className="material-symbols-outlined text-[22px]">
                        menu
                    </span>
                </button>

                {/* Header title */}
                <div className="flex-1">
                    {header && (
                        <p className="text-[#003527] font-semibold text-base">
                            {header}
                        </p>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
                        <span className="material-symbols-outlined text-[22px]">
                            notifications
                        </span>
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>
                    <div className="h-8 w-px bg-slate-200 mx-1" />
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-900 leading-none">
                                {auth?.user?.name ?? "Admin BMN"}
                            </p>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                                UIN Bukittinggi
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#064E3B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {auth?.user?.name?.[0]?.toUpperCase() ?? "A"}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main
                className="pt-16 min-h-screen transition-all duration-300"
                style={{ marginLeft: collapsed ? "72px" : "256px" }}
            >
                <div className="p-8">{children}</div>
            </main>

            <FlashMessage />
        </div>
    );
}
