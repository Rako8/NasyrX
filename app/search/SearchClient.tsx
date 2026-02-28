"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/store/useLanguage";

interface Product {
    id: string; name: string; price: number; image: string;
    description: string; category: string;
}

export default function SearchClient({ allProducts }: { allProducts: Product[] }) {
    const { t } = useLanguage();
    const [query, setQuery] = useState("");
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const results = query.trim().length > 0
        ? allProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-10">
                    {mounted ? t("search_title") : "ПОИСК"}
                </h1>

                {/* Search input */}
                <div className="relative mb-14">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-2xl">search</span>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={mounted ? t("search_placeholder") : "Найти товар..."}
                        className="w-full bg-transparent border-b-2 border-white/20 focus:border-white/60 py-5 pl-14 pr-6 text-xl text-white placeholder-white/30 outline-none transition-colors"
                    />
                </div>

                {/* Results */}
                {query.trim() === "" ? (
                    <p className="text-white/40 text-center text-lg font-light mt-20">
                        {mounted ? t("search_start") : "Начните вводить запрос для поиска товаров."}
                    </p>
                ) : results.length === 0 ? (
                    <p className="text-white/40 text-center text-lg font-light mt-20">
                        {mounted ? t("search_empty") : "Ничего не найдено."}
                    </p>
                ) : (
                    <>
                        <p className="text-white/50 text-sm mb-8 uppercase tracking-widest">
                            {mounted ? t("search_results") : "Результаты"} — {results.length}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
                            {results.map(product => (
                                <Link key={product.id} href={`/product/${product.id}`} className="group block">
                                    <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-black/20 mb-4">
                                        <Image
                                            src={product.image} alt={product.name} fill
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                                    </div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="text-base font-bold group-hover:text-accent transition-colors">{product.name}</h4>
                                        <span className="text-accent font-light">${product.price}</span>
                                    </div>
                                    <p className="text-white/50 text-sm truncate">{product.description}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
