"use client";

import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import CartItems from "./CartItems";
import { Button } from "../ui/button";

type CartWithProduct = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: true;
      };
    };
  };
}>;

type Cart = Prisma.CartGetPayload<{include:{cartItems:{include:{product:true}}}}>;

function CartPageClient() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartWithProduct>();
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(
          "/api/products?type=fetchOrCreateCart"
        );
        setCartItems(data);
        setCart(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  if (cart?.numItemsInCart === 0) {
    return <SectionTitle text="Empty Cart" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      {cart && (
        <div className="mt-8 grid gap-y-4 lg:grid-cols-12 space-x-4">
          <div className="lg:col-span-8">
            <CartItems cartItems={cartItems!} />
          </div>
          <div className="lg:col-span-4">
            <CartTotals cart={cart} />
            <Button className="w-full mt-4">Place Order</Button>
          </div>
        </div>
      )}
    </>
  );
}
export default CartPageClient;
