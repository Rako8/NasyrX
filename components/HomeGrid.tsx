"use client";

import { useLanguage } from "@/store/useLanguage";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
    id: string; name: string; price: number; image: string; description: string;
}

export default function HomeGrid({ products }: { products: Product[] }) {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-end mb-14 border-b border-white/15 pb-5">
                    <h3 className="text-xl font-bold tracking-wider uppercase">
                        {mounted ? t("latest_drops") : "ПОСЛЕДНИЕ ДРОПЫ"}
                    </h3>
                    <Link href="/collections" className="hidden md:flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] uppercase hover:text-accent transition-colors">
                        {mounted ? t("view_all") : "ВСЕ ТОВАРЫ"}
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                    {products.map((product, i) => (
                        <div key={product.id} className={i % 2 === 1 ? "md:mt-16" : ""}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-14 md:hidden">
                    <Link href="/collections" className="w-full h-12 border border-white rounded-lg text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center">
                        {mounted ? t("view_all_collections") : "ВСЕ КОЛЛЕКЦИИ"}
                    </Link>
                </div>
            </div>
        </section>
    );
}
