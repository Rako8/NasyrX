"use client";

import Link from "next/link";
import { useLanguage } from "@/store/useLanguage";
import { useEffect, useState, useActionState } from "react";
import { subscribe } from "@/app/actions/newsletter";

export default function Footer() {
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [state, formAction, isPending] = useActionState(subscribe, null) as any;
    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <footer className="py-14 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20" />
        </footer>
    );

    return (
        <footer className="py-14 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="flex flex-col gap-4 max-w-md">
                        <h5 className="text-lg font-bold tracking-wider uppercase">{t("footer_club")}</h5>
                        <p className="text-white/55 text-sm">{t("footer_club_desc")}</p>

                        <form action={formAction} className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder={t("footer_email_placeholder")}
                                    className="bg-transparent border-b border-white/30 text-white placeholder-white/35 focus:outline-none focus:border-white py-2 flex-1 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors whitespace-nowrap disabled:opacity-50"
                                >
                                    {isPending ? "..." : t("footer_subscribe")}
                                </button>
                            </div>
                            {state?.success && (
                                <p className="text-accent text-[11px] font-bold tracking-wider uppercase animate-pulse">{state.success}</p>
                            )}
                            {state?.error && (
                                <p className="text-red-400 text-[11px] font-bold tracking-wider uppercase">{state.error}</p>
                            )}
                        </form>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-white/55">
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
                    </div>
                </div>
                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/30">
                    <p>{t("footer_rights")}</p>
                    <div className="flex gap-5">
                        <Link href="#" className="hover:text-white/60 transition-colors">{t("footer_privacy")}</Link>
                        <Link href="#" className="hover:text-white/60 transition-colors">{t("footer_terms")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
