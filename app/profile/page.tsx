"use client";

import { useLanguage } from "@/store/useLanguage";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const menuItems = [
        { icon: "receipt_long", keyLabel: "profile_orders" as const, href: "#" },
        { icon: "settings", keyLabel: "profile_settings" as const, href: "#" },
    ];

    return (
        <main className="flex-grow">
            <div className="max-w-2xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="mb-14 pb-10 border-b border-white/15">
                    <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">person</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight uppercase">
                                {mounted ? t("profile_title") : "МОЙ АККАУНТ"}
                            </h1>
                            <p className="text-white/50 text-sm mt-1">
                                {mounted ? t("profile_guest") : "Вы не вошли в систему"}
                            </p>
                        </div>
                    </div>
                    <p className="text-white/60 text-base font-light leading-relaxed">
                        {mounted ? t("profile_desc") : "Войдите чтобы видеть историю заказов и управлять профилем."}
                    </p>
                </div>

                {/* Menu items */}
                <div className="flex flex-col gap-2 mb-10">
                    {menuItems.map(item => (
                        <Link
                            key={item.keyLabel}
                            href={item.href}
                            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">
                                {item.icon}
                            </span>
                            <span className="font-medium group-hover:text-accent transition-colors">
                                {mounted ? t(item.keyLabel) : ""}
                            </span>
                            <span className="material-symbols-outlined ml-auto text-white/30">chevron_right</span>
                        </Link>
                    ))}
                </div>

                {/* Sign out / Sign in CTA */}
                <button className="w-full h-13 py-4 border border-white/20 hover:border-white rounded-xl text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/5">
                    {mounted ? t("profile_logout") : "Выйти"}
                </button>
            </div>
        </main>
    );
}
