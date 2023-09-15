import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const productPrices = await stripe.prices.list({
        limit:3
    });
    return NextResponse.json(productPrices.data)
}