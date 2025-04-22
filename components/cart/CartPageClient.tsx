"use client";

import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import CartItems from "./CartItems";
import { Button } from "../ui/button";
import { useCart } from "@/utils/numItemsInCart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Cart = Prisma.CartGetPayload<{
  include: { cartItems: { include: { product: true } } };
}>;

const toastDesign =
  "fixed top-5 left-1/2 transform -translate-x-1/2 w-80 shadow-lg bg-primary-foreground";

function CartPageClient() {
  const [cartItems, setCartItems] = useState<Cart>();
  const [cart, setCart] = useState<Cart>();
  const router = useRouter();

  const { fetchCartNumber } = useCart();
  const { toast } = useToast();

  const createOrder = async () => {
    try {
      const { data } = await axios.post("/api/products?type=createOrderAction");
      toast({
        description: "Your order has been placed !",
        className: toastDesign,
      });

      console.log(data);
      console.log();

      router.push(`/checkout?orderId=${data.orderId}&cartId=${data.cartId}`);
    } catch (error: any) {
      console.log(error);
    }

  };

  const refetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/products?type=fetchOrCreateCart");
      console.log(data);

      setCartItems(data);
      setCart(data);
      fetchCartNumber();
    } catch (error: any) {
      console.log(error);
    }
  };

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


  return (
    <>
      <SectionTitle text="Shopping Cart" />
      {cart && (
        <div className="mt-8 grid gap-y-4 lg:grid-cols-12 space-x-4">
          <div className="lg:col-span-8">
            <CartItems
              cartItems={cartItems!}
              refetchCartData={refetchCartData}
            />
          </div>
          <div className="lg:col-span-4">
            <CartTotals cart={cart} />
            <Button className="w-full mt-4" onClick={() => createOrder()}>
              Place Order
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
export default CartPageClient;
