import stripe from "@/lib/stripe";
import { db } from "@/server/db";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";


export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const headerList = await headers();
        const signature = headerList.get("stripe-signature");

        if (!signature) {
            console.error("No signature from stripe");
            return NextResponse.json({
                error: "No Signature"
            }, {
                status: 400
            });
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error("Webhook signature verification failed", error.message);
                return NextResponse.json({
                    error: `Webhook Error: ${error.message} `
                }, {
                    status: 400
                });
            }
        }
        const session = event?.data.object as Stripe.Checkout.Session;
        switch (event?.type) {
            case "checkout.session.completed": {
                const credits = Number(session.metadata?.credits);
                const userId = session.client_reference_id;
                if (!userId || !credits) throw new Error("Something went wrong");
                await db.stripeTransactions.create({
                    data: {
                        userId,
                        credits
                    }
                });
                await db.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        credit: {
                            increment: credits
                        }
                    }
                });
                break;
            }
            default:
                console.log("Unhandled event type", event?.type);
                return NextResponse.json({
                    received: true
                });
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error handling Webhook", error);
            return NextResponse.json({
                errpr: "Webhook handler failed",
                details: error.message
            });
        }
    }
}