"use client";

import { useCart } from "@/store/useCart";
import { useLanguage } from "@/store/useLanguage";
import { useState, useEffect } from "react";

interface ProductProps {
    product: { id: string; name: string; price: number; image: string; description: string; sizes: string; };
}

export default function AddToCartButton({ product }: ProductProps) {
    const addItem = useCart((s: any) => s.addItem);
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    let sizes = ["7", "8", "9", "9.5", "10", "11", "12", "13"];
    try {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed) && parsed.length > 0) sizes = parsed;
    } catch { }

    const [selected, setSelected] = useState<string>("");

    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 opacity-55">
                    {mounted ? t("detail_size_label") : "ВЫБЕРИТЕ РАЗМЕР (US)"}
                </label>
                <div className="relative">
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full appearance-none bg-transparent border border-white/30 rounded-lg py-4 px-4 pr-10 text-base font-medium focus:outline-none focus:border-white cursor-pointer text-white hover:border-white transition-colors"
                    >
                        <option className="text-slate-900 bg-white" value="">
                            {mounted ? t("detail_size_placeholder") : "Выберите размер"}
                        </option>
                        {sizes.map((size) => (
                            <option key={size} className="text-slate-900 bg-white" value={size}>US {size}</option>
                        ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <span className="material-symbols-outlined">expand_more</span>
                    </span>
                </div>
                <button className="text-[11px] mt-2 border-b border-white/30 hover:border-white pb-px transition-colors">
                    {mounted ? t("detail_size_guide") : "Таблица размеров"}
                </button>
            </div>

            <button
                onClick={() => {
                    if (!selected) return;
                    addItem({ ...product, size: selected, quantity: 1 });
                }}
                className="group flex items-center justify-between w-full px-7 py-5 border border-white/30 hover:border-white rounded-lg bg-transparent text-white transition-all duration-300 hover:bg-white/5"
            >
                <span className="text-base font-bold tracking-[0.15em] uppercase">
                    {mounted ? t("add_to_bag") : "В КОРЗИНУ"}
                </span>
                <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <p className="text-center text-[11px] text-white/35">
                {mounted ? t("detail_free_shipping") : "Бесплатная доставка при заказе от $200."}
            </p>
        </div>
    );
}
