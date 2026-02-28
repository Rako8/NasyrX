import { prisma } from "@/lib/prisma";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();

    return (
        <main className="flex-grow">
            {/* Breadcrumb */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-4">
                <div className="flex gap-3 text-xs font-bold uppercase tracking-widest text-white/50">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Men</span>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </div>
            </div>

            {/* Main grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* LEFT — images */}
                <div className="flex-1 flex flex-col gap-5">
                    {/* Main image */}
                    <div className="relative w-full aspect-[4/5] bg-black/20 rounded-lg overflow-hidden group">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-5 left-5">
                            <span className="bg-white text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] rounded-sm">
                                New Season
                            </span>
                        </div>
                    </div>
                    {/* Thumbnail row */}
                    <div className="grid grid-cols-2 gap-4">
                        {[0, 1].map((i) => (
                            <div key={i} className="aspect-square bg-black/20 rounded-lg overflow-hidden group relative">
                                <Image
                                    src={product.image}
                                    alt={`${product.name} view ${i + 2}`}
                                    fill
                                    sizes="25vw"
                                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${i === 0 ? "brightness-75 hover:brightness-100" : "brightness-90 hover:brightness-100"}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — details */}
                <div className="lg:w-[440px] flex flex-col lg:sticky lg:top-20 h-fit">
                    {/* Title + price */}
                    <div className="pb-10 border-b border-white/20 mb-10">
                        <h1 className="text-5xl md:text-6xl font-bold leading-none tracking-tighter uppercase mb-5">
                            {product.name}
                        </h1>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-light opacity-80">{product.category}</span>
                            <span className="text-2xl font-bold">${product.price}.00</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-10 space-y-6">
                        <p className="text-base leading-relaxed text-white/75 font-light">
                            {product.description}
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-2">
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 opacity-50">Materials</h3>
                                <p className="text-sm text-white/80">Italian suede &amp; recycled mesh upper. Natural rubber outsole.</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 opacity-50">Care</h3>
                                <p className="text-sm text-white/80">Wipe clean with damp cloth. Store in dust bag.</p>
                            </div>
                        </div>
                    </div>

                    {/* Add to cart */}
                    <AddToCartButton product={product} />

                    <p className="text-center text-[11px] text-white/35 mt-4">
                        Free shipping and returns on all orders over $200.
                    </p>
                </div>
            </div>
        </main>
    );
}
