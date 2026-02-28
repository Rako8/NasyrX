import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2026-02-25.clover" as any,
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_dummy";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve the order ID from metadata
        const orderId = session.metadata?.orderId;

        if (orderId) {
            // Update order status in DB
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "PAID",
                    customerEmail: session.customer_details?.email || "unknown@email.com",
                },
            });

            // Send confirmation email via Resend
            if (session.customer_details?.email) {
                try {
                    await resend.emails.send({
                        from: "LUXE Store <orders@luxestore.com>",
                        to: session.customer_details.email,
                        subject: "Order Confirmation - LUXE Store",
                        html: `<h1>Thank you for your order!</h1><p>Your order #${orderId} has been confirmed and is being processed.</p>`,
                    });
                } catch (emailError) {
                    console.error("Failed to send email:", emailError);
                }
            }
        }
    }

    return NextResponse.json({ received: true });
}
