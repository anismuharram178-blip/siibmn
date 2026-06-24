import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useMemo } from "react";

const ICONS = {
    danger: "delete",
    default: "help",
    primary: "info",
};

export default function ConfirmDialog({
    show = false,
    title = "Konfirmasi",
    description,
    confirmLabel = "Konfirmasi",
    cancelLabel = "Batal",
    variant = "danger", // danger | primary | default
    closeable = true,
    onClose = () => {},
    onConfirm = () => {},
    confirmDisabled = false,
    children,
}) {
    const cfg = useMemo(() => {
        if (variant === "primary") {
            return {
                iconBg: "bg-emerald-50",
                iconFg: "text-emerald-600",
                accent: "bg-emerald-600 hover:bg-emerald-700",
                cancel: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
            };
        }
        if (variant === "default") {
            return {
                iconBg: "bg-slate-50",
                iconFg: "text-slate-600",
                accent: "bg-[#064E3B] hover:bg-[#0a6b50]",
                cancel: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
            };
        }
        // danger (default)
        return {
            iconBg: "bg-red-50",
            iconFg: "text-red-600",
            accent: "bg-red-600 hover:bg-red-700",
            cancel: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
        };
    }, [variant]);

    const close = () => {
        if (closeable) onClose();
    };

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-2xl ${cfg.iconBg} flex items-center justify-center flex-shrink-0`}
                                        >
                                            <span className={`material-symbols-outlined text-[26px] ${cfg.iconFg}`}>
                                                {ICONS[variant] ?? ICONS.default}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-black text-[#003527]"
                                            >
                                                {title}
                                            </Dialog.Title>

                                            {description && (
                                                <Dialog.Description className="mt-2 text-sm text-slate-600 leading-relaxed">
                                                    {description}
                                                </Dialog.Description>
                                            )}

                                            {children}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        onClick={close}
                                        className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${cfg.cancel}`}
                                    >
                                        {cancelLabel}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={confirmDisabled}
                                        onClick={() => onConfirm()}
                                        className={`px-5 py-2.5 text-sm font-black rounded-xl transition-colors text-white ${cfg.accent} disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {confirmLabel}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

