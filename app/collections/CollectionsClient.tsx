"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useLanguage } from "@/store/useLanguage";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export default function CollectionsClient({ products }: { products: Product[] }) {
    const { t } = useLanguage();
    const addItem = useCart((s: any) => s.addItem);
    const [mounted, setMounted] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => setMounted(true), []);

    const filters = [
        { key: "all", label: mounted ? t("filter_all") : "Все" },
        { key: "Shoes", label: mounted ? t("filter_shoes") : "Обувь" },
        { key: "Clothes", label: mounted ? t("filter_clothes") : "Одежда" },
        { key: "Accessories", label: mounted ? t("filter_accessories") : "Аксессуары" },
    ];

    const filtered = activeFilter === "all"
        ? products
        : products.filter(p => p.category === activeFilter);

    return (
        <main className="flex-grow">
            {/* Hero Banner */}
            <div className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
                    {mounted ? t("collections_title") : "КОЛЛЕКЦИИ"}
                </h1>
                <p className="text-white/60 text-lg font-light">
                    {mounted ? t("collections_desc") : "Все наши лимитированные выпуски в одном месте."}
                </p>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-16 z-40 w-full border-b border-white/10 bg-primary/95 backdrop-blur px-6 py-3 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
                    <div className="flex gap-2">
                        {filters.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setActiveFilter(f.key)}
                                className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider transition-all whitespace-nowrap ${activeFilter === f.key
                                        ? "bg-white text-primary shadow-lg"
                                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <span className="text-white/40 text-xs shrink-0">{filtered.length} items</span>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
                    {filtered.map(product => (
                        <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer block">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-black/20 mb-5">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addItem({ ...product, size: "10", quantity: 1 });
                                    }}
                                    className="absolute bottom-4 right-4 bg-white text-primary p-3 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hover:bg-black hover:text-white"
                                >
                                    <span className="material-symbols-outlined text-base leading-none">arrow_outward</span>
                                </button>
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-lg font-bold group-hover:text-accent transition-colors">{product.name}</h4>
                                <span className="text-accent font-light">${product.price}</span>
                            </div>
                            <p className="text-white/50 text-sm truncate">{product.description}</p>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-16">
                    <button className="group flex h-14 w-full max-w-xs items-center justify-center gap-3 border border-white/20 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/5">
                        {mounted ? t("load_more") : "ЗАГРУЗИТЬ ЕЩЁ"}
                        <span className="material-symbols-outlined transition-transform group-hover:translate-y-1">expand_more</span>
                    </button>
                </div>
            </div>
        </main>
    );
}
