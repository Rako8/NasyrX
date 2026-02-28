"use client";

import Image from "next/image";
import { useLanguage } from "@/store/useLanguage";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeHero() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section className="relative pt-10 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left text */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1 z-10">
                        <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase text-accent w-fit">
                            {mounted ? t("hero_badge") : "Лимитированная коллекция"}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter uppercase">
                            {mounted ? t("hero_title_1") : "ПОДНИМИТЕ"}<br />
                            {mounted ? t("hero_title_2") : "СВОЙ"}{" "}
                            <span className="italic text-accent">{mounted ? t("hero_title_accent") : "УРОВЕНЬ"}</span>
                        </h2>
                        <p className="text-sm text-white/75 font-light max-w-sm leading-relaxed">
                            {mounted ? t("hero_desc") : "Откройте для себя лимитированную коллекцию кроссовок."}
                        </p>
                        <div>
                            <Link href="/collections" className="inline-flex items-center h-12 px-8 border border-white rounded-lg text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-primary transition-all duration-300">
                                {mounted ? t("hero_cta") : "Исследовать"}
                            </Link>
                        </div>
                    </div>

                    {/* Right hero image */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative w-[320px] h-[280px] md:w-[420px] md:h-[360px]">
                            <div className="absolute inset-0 bg-[#1a1a2e] rounded-2xl rotate-3 shadow-2xl" />
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_GM8b7WMWpamdIrPon1FXTxORlKGkfwNLhE25jajx8TRMigVQ-biEO5flZWkK7EXh_4szo3-nMvALiu_YlxxL-vSfEmmCUVaSks-tipRzTCu6UjxoH6O5Vqe_oJgCn3eXZHlii_knBd8u4dPZSFeo1Rg0Dl8hzUE6xlsW0iQUo6cz1sOJ8VNZcxfgxPdq0Sh3tk2eFGrww1zvH7cAhW3F1g2XWLnVHWMP1ziJn1IC0Rzn4UsZKJrw1Ql2Z2QR_Y0IuMmYKBRhkGQ"
                                alt="Luxury sneaker"
                                fill
                                priority
                                className="object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 p-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
