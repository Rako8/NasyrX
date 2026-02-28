"use client";

import { useState, useRef, useEffect } from "react";
import { addProduct, deleteProduct } from "@/app/actions/product";
import LogoutButton from "@/components/LogoutButton";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

export default function AdminDashboard() {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... (existing code remains same, will be in the final replacement)
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.url) {
                setImageUrl(data.url);
            } else {
                alert("Upload failed: " + data.error);
            }
        } catch (err) {
            alert("Error uploading image");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageUrl) {
            alert("Please upload an image first.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.append("image", imageUrl);

        const result = await addProduct(formData);

        if (result?.error) {
            alert(result.error);
        } else {
            alert("Product added successfully!");
            if (formRef.current) formRef.current.reset();
            setImageUrl("");
            fetchProducts(); // Refresh list
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const result = await deleteProduct(id);
        if (result.success) {
            fetchProducts();
        } else {
            alert(result.error);
        }
    };

    return (
        <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
            <div className="flex justify-between items-center border-b border-white/20 pb-8 mb-12">
                <h1 className="text-4xl font-bold tracking-tighter uppercase">Admin Dashboard</h1>
                <LogoutButton />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-accent">Add New Product</h2>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title & Price */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Title</label>
                            <input name="name" type="text" required className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder-white/20" placeholder="e.g. Minimalist Boot" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Price ($)</label>
                            <input name="price" type="number" step="0.01" required className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder-white/20" placeholder="0.00" />
                        </div>

                        {/* Category & Stock Level */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Category</label>
                            <select name="category" className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors cursor-pointer text-white appearance-none">
                                <option className="text-slate-900 bg-white" value="Shoes">Shoes</option>
                                <option className="text-slate-900 bg-white" value="Clothes">Clothes</option>
                                <option className="text-slate-900 bg-white" value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Stock Level</label>
                            <input name="stockLevel" type="number" required defaultValue="10" className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder-white/20" />
                        </div>

                        {/* Sizes & In Stock Toggle */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Sizes (Comma Separated)</label>
                            <input name="sizes" type="text" required defaultValue="7, 8, 9, 10, 11" className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-medium focus:outline-none focus:border-white transition-colors placeholder-white/20" />
                        </div>

                        <div className="flex flex-col gap-4 justify-center">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-60">Status</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="inStock" defaultChecked className="sr-only peer" />
                                <div className="w-14 h-7 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent"></div>
                                <span className="ml-4 text-lg font-medium">In Stock</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold uppercase tracking-widest opacity-60">Description</label>
                        <textarea name="description" required rows={4} className="w-full bg-transparent border-b border-white/30 py-4 text-lg font-light focus:outline-none focus:border-white transition-colors placeholder-white/20 resize-none" placeholder="Enter product description..."></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold uppercase tracking-widest opacity-60">Product Image</label>
                        <div className="flex items-center gap-6">
                            <div className="relative overflow-hidden w-32 h-32 bg-white/5 border border-white/20 border-dashed rounded-xl flex items-center justify-center">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl opacity-40">image</span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                    className="block w-full text-sm text-white/70 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-primary hover:file:bg-white/90 cursor-pointer transition-colors"
                                />
                                <p className="text-xs opacity-50 mt-1">
                                    {isUploading ? "Uploading..." : "Upload cloud image (PNG, JPG, WEBP)"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full mt-8 group relative overflow-hidden rounded-full border border-white hover:border-accent bg-white text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 w-0 bg-accent transition-all duration-[250ms] ease-out group-hover:w-full opacity-100"></div>
                        <div className="relative flex items-center justify-center px-8 py-5 group-hover:text-white transition-colors">
                            <span className="text-lg font-bold tracking-widest uppercase">
                                Add Product to Store
                            </span>
                        </div>
                    </button>
                </form>
            </div>

            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-accent border-b border-white/10 pb-4">Manage Products</h2>

                {isLoadingProducts ? (
                    <div className="text-center py-20 opacity-50 uppercase tracking-widest text-sm">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 opacity-50 uppercase tracking-widest text-sm">No products found.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider opacity-60 mt-1">
                                            <span className="text-accent">{product.category}</span>
                                            <span>${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-all"
                                    title="Delete product"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
