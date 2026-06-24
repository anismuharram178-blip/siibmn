import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10);
            const t = setTimeout(() => {
                setAnimate(false);
                setTimeout(() => setVisible(false), 300);
            }, 3500);
            return () => clearTimeout(t);
        }
    }, [flash]);

    if (!visible) return null;

    const isSuccess = !!flash?.success;

    return (
        <div
            className={`fixed top-6 right-6 z-50 transition-all duration-300
            ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
            <div
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-white text-sm font-medium min-w-[280px]
                ${isSuccess ? "bg-[#064E3B]" : "bg-red-600"}`}
            >
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                        {isSuccess ? "check_circle" : "error"}
                    </span>
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide opacity-75 mb-0.5">
                        {isSuccess ? "Success" : "Error"}
                    </p>
                    <p>{flash?.success || flash?.error}</p>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors flex-shrink-0"
                >
                    <span className="material-symbols-outlined text-[16px]">
                        close
                    </span>
                </button>
            </div>
        </div>
    );
}
