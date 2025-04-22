"use server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";
import db from "@/utils/db";

export const POST = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);

  const origin = requestHeaders.get("origin");

  const { orderId, cartId } = await request.json();

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true } } },
  });

  if (!order || !cart) {
    return Response.json(null, { status: 404, statusText: "Not Found" });
  }


  const line_items = cart.cartItems.map((item) => {
    return {
      quantity: item.amount,
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: item.product.price * 100,
      },
    };
  });

  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Shipping Fee",
        images: [],
      },
      unit_amount: cart.shipping * 100,
    },
    quantity: 1,
  });

  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Tax",
        images: [],
      },
      unit_amount: cart.tax * 100,
    },
    quantity: 1,
  });

  const language = navigator.language;
  const localLanguage = language.split("-")[0];

  console.log(localLanguage);
  const validStripeLocales = new Set([
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "et",
    "fi",
    "fr",
    "hu",
    "it",
    "ja",
    "lt",
    "lv",
    "ms",
    "mt",
    "nb",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sv",
    "zh",
  ]);

  const stripeLocale = validStripeLocales.has(localLanguage) ? localLanguage : 'en'

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: "payment",
      locale: stripeLocale as any,
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
