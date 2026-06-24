import { useState, useRef, useEffect } from "react";

export function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Select...",
    icon = "expand_more",
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selected = options.find(
        (o) => (typeof o === "string" ? o : o.value) === value,
    );
    const selectedLabel = selected
        ? typeof selected === "string"
            ? selected
            : selected.label
        : null;
    const selectedIcon =
        selected && typeof selected === "object" ? selected.icon : null;

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm transition-all duration-200
                    ${open ? "border-emerald-400 ring-2 ring-emerald-500/20 bg-white" : "border-slate-200 hover:border-emerald-300"}
                    ${value ? "text-[#003527] font-semibold" : "text-slate-400"}`}
            >
                {selectedIcon && (
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                        {selectedIcon}
                    </span>
                )}
                <span className="flex-1 text-left">
                    {selectedLabel || placeholder}
                </span>
                <span
                    className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    expand_more
                </span>
            </button>

            {/* Dropdown panel */}
            <div
                className={`absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden
                transition-all duration-200 origin-top
                ${open ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}`}
                style={{ minWidth: "180px" }}
            >
                {/* Clear option */}
                <button
                    type="button"
                    onClick={() => {
                        onChange("");
                        setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50 border-b border-slate-100
                        ${!value ? "text-[#003527] font-semibold bg-emerald-50/50" : "text-slate-400"}`}
                >
                    <span
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        border-slate-300"
                    >
                        {!value && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]" />
                        )}
                    </span>
                    All
                </button>

                {options.map((opt) => {
                    const label = typeof opt === "string" ? opt : opt.label;
                    const val = typeof opt === "string" ? opt : opt.value;
                    const oIcon = typeof opt === "object" ? opt.icon : null;
                    const oColor = typeof opt === "object" ? opt.color : null;
                    const active = value === val;

                    return (
                        <button
                            key={val}
                            type="button"
                            onClick={() => {
                                onChange(val);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-50
                                ${active ? "text-[#003527] font-semibold bg-emerald-50/50" : "text-slate-600"}`}
                        >
                            <span
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${active ? "border-[#064E3B]" : "border-slate-300"}`}
                            >
                                {active && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]" />
                                )}
                            </span>
                            {oIcon && (
                                <span
                                    className={`material-symbols-outlined text-[18px] ${oColor || "text-slate-400"}`}
                                >
                                    {oIcon}
                                </span>
                            )}
                            <span className="flex-1 text-left">{label}</span>
                            {oColor && (
                                <span
                                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                        oColor.includes("emerald")
                                            ? "bg-emerald-500"
                                            : oColor.includes("amber")
                                              ? "bg-amber-500"
                                              : oColor.includes("red")
                                                ? "bg-red-500"
                                                : "bg-slate-400"
                                    }`}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
