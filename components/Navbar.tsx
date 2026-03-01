"use client";

import Link from "next/link";
import CartDrawer from "./CartDrawer";
import NXLogo from "./NXLogo";
import { useLanguage } from "@/store/useLanguage";
import { Locale } from "@/lib/translations";
import { useEffect, useState } from "react";

const locales: { code: Locale; label: string }[] = [
    { code: "ru", label: "РУ" },
    { code: "en", label: "EN" },
    { code: "kz", label: "ҚАЗ" },
];

export default function Navbar() {
    const { t, locale, setLocale } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <nav className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <NXLogo className="h-6 w-auto" />
                        <h1 className="text-xl font-bold tracking-tight">NasyrX</h1>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/collections" className="text-xs font-bold tracking-widest hover:text-accent transition-colors">
                            {mounted ? t("nav_collections") : "КОЛЛЕКЦИИ"}
                        </Link>
                        <Link href="/search" className="text-xs font-bold tracking-widest hover:text-accent transition-colors">
                            {mounted ? t("nav_search") : "ПОИСК"}
                        </Link>
                    </div>

                    {/* Right side: Language + Cart + Profile */}
                    <div className="flex items-center gap-2">
                        {/* Language switcher */}
                        {mounted && (
                            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 mr-2">
                                {locales.map(({ code, label }) => (
                                    <button
                                        key={code}
                                        onClick={() => setLocale(code)}
                                        className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full transition-all ${locale === code
                                            ? "bg-white text-primary"
                                            : "text-white/70 hover:text-white"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <CartDrawer />

                        <Link href="/profile" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-xl">person</span>
                        </Link>

                        {/* Mobile menu */}
                        <button className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
