import Link from "next/link";

export default function CancelPage() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <span className="material-symbols-outlined text-5xl opacity-50">cancel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 flex items-center gap-4">
                Checkout Canceled
            </h1>
            <p className="text-lg text-white/70 max-w-md mb-12 font-light">
                Your payment was canceled. No charges were made.
            </p>
            <Link href="/">
                <button className="group relative overflow-hidden rounded-full border border-white/30 hover:border-white bg-transparent text-white transition-all duration-300">
                    <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                    <div className="relative border-2 border-transparent px-8 py-5 flex items-center gap-3">
                        <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">shopping_bag</span>
                        <span className="text-sm font-bold tracking-widest uppercase">Return to Cart</span>
                    </div>
                </button>
            </Link>
        </main>
    );
}
