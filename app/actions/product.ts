"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function addProduct(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const category = formData.get("category") as string;
        const stockLevel = parseInt(formData.get("stockLevel") as string, 10);
        const inStock = formData.get("inStock") === "on";
        const image = formData.get("image") as string;

        // Parse sizes (comma-separated string to JSON array)
        const sizesString = formData.get("sizes") as string;
        const sizes = JSON.stringify(sizesString.split(",").map(s => s.trim()));

        // Setup single image as array for backwards compatibility with the schema if needed
        const images = JSON.stringify([image]);

        await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                stockLevel,
                inStock,
                sizes,
                image,
                images,
            },
        });

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to add product:", error);
        return { error: "Failed to add product to database." };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });

        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { error: "Failed to delete product." };
    }
}
