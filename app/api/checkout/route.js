import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request){
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    let data = await request.json();
    console.log(data);
    let priceId = data.productPrice
    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price: priceId,
            quantity:1
        }],
        mode:'payment',
        success_url: "http://localhost:3000?status=success",
        cancel_url: "http://localhost:3000?status=cancel"
    })
    return NextResponse.json(session.url)
}