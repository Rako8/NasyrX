import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2026-02-25.clover" as any,
});

export async function POST(request: Request) {
    try {
        const { items } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in cart" }, { status: 400 });
        }

        // Format line items for Stripe
        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: `${item.name} - Size ${item.size}`,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Calculate total
        const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        // Create a pending order in the database
        const order = await prisma.order.create({
            data: {
                customerEmail: "pending@checkout.com", // Will be updated by webhook
                totalAmount,
                status: "PENDING",
                items: JSON.stringify(items),
            },
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/cancel`,
            metadata: {
                orderId: order.id,
            },
        });

        // Update order with session ID
        await prisma.order.update({
            where: { id: order.id },
            data: { stripeSessionId: session.id },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
