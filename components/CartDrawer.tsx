"use client";

import Image from "next/image";
import { useCart } from "@/store/useCart";
import { useLanguage } from "@/store/useLanguage";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const { items, removeItem, updateQuantity, total } = useCart();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Open cart"
            >
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                {items.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
                )}
            </button>

            {open && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => setOpen(false)} />}

            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-primary-dark z-[110] flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                    <h2 className="text-lg font-bold uppercase tracking-widest">{t("cart_title")}</h2>
                    <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto px-8 py-6 space-y-6">
                    {items.length === 0 ? (
                        <p className="text-white/50 text-center mt-10">{t("cart_empty")}</p>
                    ) : (
                        items.map((item: any) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-white/10 pb-5">
                                <div className="relative w-20 h-20 rounded-lg bg-black/20 overflow-hidden flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <span className="text-sm font-light">${item.price}</span>
                                    </div>
                                    <p className="text-[11px] text-white/50 uppercase tracking-widest mb-3">{t("cart_size")}: {item.size}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1">
                                            <button onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))} className="text-white/60 hover:text-white">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="text-sm min-w-[1ch] text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="text-white/60 hover:text-white">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                        <button onClick={() => removeItem(item.id, item.size)} className="text-xs text-red-300 hover:text-red-200 uppercase tracking-wide">
                                            {t("cart_remove")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="px-8 py-6 border-t border-white/10">
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-sm font-bold uppercase tracking-widest text-white/60">{t("cart_total")}</span>
                            <span className="text-2xl font-bold">${total()}</span>
                        </div>
                        <button
                            onClick={async () => {
                                const res = await fetch("/api/checkout", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ items }),
                                });
                                const data = await res.json();
                                if (data.url) window.location.href = data.url;
                            }}
                            className="w-full py-4 bg-white text-primary font-bold tracking-widest uppercase rounded-lg hover:bg-accent transition-colors"
                        >
                            {t("cart_checkout")}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
