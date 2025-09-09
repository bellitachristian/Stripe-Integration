import { NextResponse } from "next/server";
import Stripe from "stripe";
import * as api from "../../utils/api";

// STRIPE INTEGRATION
// export async function POST(request){
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//     let data = await request.json();
//     console.log(data);
//     let priceId = data.productPrice
//     const session = await stripe.checkout.sessions.create({
//         line_items:[{
//             price: priceId,
//             quantity:1
//         }],
//         mode:'payment',
//         success_url: "http://localhost:3000?status=success",
//         cancel_url: "http://localhost:3000?status=cancel"
//     })
//     return NextResponse.json(session.url)
// }

type CheckoutLineItem = {
  amount: number; // in centavos, e.g. ₱100 = 10000
  currency: "PHP"; // PayMongo only supports PHP
  name: string;
  quantity: number;
};

interface CreateCheckoutSessionRequest {
  data: {
    attributes: {
      line_items: CheckoutLineItem[];
      payment_method_types: ("card" | "gcash" | "atome")[];
      success_url: string;
      cancel_url: string;
      // optional:
      description?: string;
      send_email_receipt?: boolean;
      show_line_items?: boolean;
      metadata?: Record<string, string>;
    };
  };
}

//PAYMONGO INTEGRATION
export async function POST(request: Request) {
  const { data }: CreateCheckoutSessionRequest = await request.json();
  const { attributes } = data;

  const {
    line_items,
    payment_method_types,
    success_url,
    cancel_url,
    description,
    send_email_receipt,
    show_line_items,
    metadata,
  } = attributes;

  const payload = {
    data: {
      attributes: {
        line_items,
        payment_method_types,
        success_url,
        cancel_url,
        ...(description && { description }),
        ...(send_email_receipt !== undefined && { send_email_receipt }),
        ...(show_line_items !== undefined && { show_line_items }),
        ...(metadata && { metadata }),
      },
    },
  };

  const response = await api.paymongo.createCheckoutSession(payload);
  return NextResponse.json(response);
}
