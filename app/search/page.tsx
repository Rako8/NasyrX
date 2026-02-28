import { prisma } from "@/lib/prisma";
import SearchClient from "./SearchClient";

export default async function SearchPage() {
    const products = await prisma.product.findMany({
        select: { id: true, name: true, price: true, image: true, description: true, category: true },
    });
    return <SearchClient allProducts={products} />;
}
