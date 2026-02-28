import { prisma } from "@/lib/prisma";
import CollectionsClient from "./CollectionsClient";

export default async function CollectionsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, price: true, image: true, description: true, category: true },
    });
    return <CollectionsClient products={products} />;
}
