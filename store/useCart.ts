"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === newItem.id && item.size === newItem.size
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === newItem.id && item.size === newItem.size
                                    ? { ...item, quantity: item.quantity + newItem.quantity }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, newItem] };
                });
            },
            removeItem: (id, size) => {
                set((state) => ({
                    items: state.items.filter((item) => !(item.id === id && item.size === size)),
                }));
            },
            updateQuantity: (id, size, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.size === size ? { ...item, quantity } : item
                    ),
                }));
            },
            clearCart: () => set({ items: [] }),
            total: () => {
                return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
        }),
        {
            name: "luxe-cart-storage",
        }
    )
);
