export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { prisma } from "@/lib/prisma";
import HomeHero from "@/components/HomeHero";
import HomeGrid from "@/components/HomeGrid";

export default async function Home() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, price: true, image: true, description: true },
        where: { inStock: true }
    });

    return (
        <main className="flex-grow">
            <HomeHero />
            <HomeGrid products={products} />
        </main>
    );
}
