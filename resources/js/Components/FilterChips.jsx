export function FilterChips({ options, value, onChange, allLabel = "All" }) {
    return (
        <div className="flex gap-2 flex-wrap">
            <button
                onClick={() => onChange("")}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 whitespace-nowrap
                    ${
                        value === ""
                            ? "bg-[#064E3B] text-white shadow-lg shadow-emerald-900/20"
                            : "bg-white border border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-700"
                    }`}
            >
                {allLabel}
            </button>
            {options.map((opt) => {
                const label = typeof opt === "string" ? opt : opt.label;
                const val = typeof opt === "string" ? opt : opt.value;
                const icon = typeof opt === "object" ? opt.icon : null;
                const active = value === val;
                return (
                    <button
                        key={val}
                        onClick={() => onChange(active ? "" : val)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 whitespace-nowrap
                            ${
                                active
                                    ? "bg-[#064E3B] text-white shadow-lg shadow-emerald-900/20 scale-105"
                                    : "bg-white border border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-700"
                            }`}
                    >
                        {icon && (
                            <span className="material-symbols-outlined text-[14px]">
                                {icon}
                            </span>
                        )}
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
