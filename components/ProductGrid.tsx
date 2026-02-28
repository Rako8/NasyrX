import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <section className="py-24 bg-black/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
                    <h3 className="text-3xl font-bold tracking-tight">LATEST DROPS</h3>
                    <a className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest hover:text-accent transition-colors" href="#">
                        VIEW ALL
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-20">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
