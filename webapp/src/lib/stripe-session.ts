'use server';
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import stripe from "./stripe";

export async function createCheckoutSession(credits: number) {
    const { userId } = await auth();
    if (!userId) {
        toast.error("Sign In to buy credits");
        redirect("/sign-in");
    }
    const dbUser = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    let customerId = dbUser?.stripeCustomerId;
    if (!customerId) {
        const customer = await stripe.customers.create({
            email: dbUser?.emailAddress ?? undefined,
            name: `${dbUser?.firstName}  ${dbUser?.lastName}` || "User",
            metadata: {
                userId: String(userId)
            }
        });
        customerId = customer.id;
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                stripeCustomerId: customerId
            }
        });
    }
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `${credits} CodeLens credits`,
                    },
                    unit_amount: Math.round((credits / 50) * 100)
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/create?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/billing?success=true`,
        client_reference_id: userId.toString(),
        metadata: {
            credits
        }
    });

    return session.url;
}