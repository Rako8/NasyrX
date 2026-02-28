"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";

interface ProductType {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export default function ProductCard({ product }: { product: ProductType }) {
    const addItem = useCart((s: any) => s.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({ ...product, size: "10", quantity: 1 });
    };

    return (
        <Link href={`/product/${product.id}`} className="group cursor-pointer block">
            {/* Image container */}
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-black/20 mb-5">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                {/* Arrow button */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-white text-primary p-3 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 hover:bg-black hover:text-white"
                >
                    <span className="material-symbols-outlined text-base leading-none">arrow_outward</span>
                </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                    <h4 className="text-xl font-bold group-hover:text-accent transition-colors">{product.name}</h4>
                    <span className="text-base font-light text-accent">${product.price}</span>
                </div>
                <p className="text-white/55 text-sm">{product.description}</p>
            </div>
        </Link>
    );
}
