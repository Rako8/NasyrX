import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
                <span className="material-symbols-outlined text-5xl text-accent">check_circle</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">Order Confirmed</h1>
            <p className="text-lg text-white/70 max-w-md mb-12 font-light">
                Thank you for your purchase. We've received your order and will email you a receipt and tracking details shortly.
            </p>
            <Link href="/">
                <button className="group relative overflow-hidden rounded-full border border-white/30 hover:border-white bg-transparent text-white transition-all duration-300">
                    <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                    <div className="relative border-2 border-transparent px-8 py-5 flex items-center gap-3">
                        <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-sm font-bold tracking-widest uppercase">Return to Store</span>
                    </div>
                </button>
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="flex-grow">
            <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
