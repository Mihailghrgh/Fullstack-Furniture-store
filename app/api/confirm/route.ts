import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import db from "@/utils/db";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log("Payment intent here : ", session.payment_intent);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
    const StripeId = session.payment_intent as string;

    if (session.status === "complete") {
      await db.order.update({
        where: { id: orderId },
        data: { isPaid: true, StripeId },
      });
    }

    await db.cart.delete({ where: { id: cartId } });
  } catch (error: any) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: "Internal server Error",
    });
  }

  redirect("/orders");
};
