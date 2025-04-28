import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const GET = async (request: NextRequest) => {
  const { userId } = await auth();

  if (!userId) {
    return Response.json("No user Id present in the db to perform action");
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;

  if (!id) {
    return Response.json("Error in finding the Id");
  }

  const presentOrder = await db.order.findUnique({
    where: { id: id },
    include: { orderItems: { include: { product: true } } },
  });

  const stripeId = presentOrder?.StripeId;

  if (!stripeId) {
    return Response.json("No stripeId present");
  }

  const payment_intent = await stripe.paymentIntents.retrieve(stripeId);
  const charge = payment_intent.payment_method as string;
  const paymentMethod = await stripe.paymentMethods.retrieve(charge);

  const data = {
    last4: paymentMethod.card?.last4,
    type: paymentMethod.card?.brand,
    order: presentOrder,
  };

  return Response.json(data);
};
