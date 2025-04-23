"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/utils/numItemsInCart";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import Image from "next/image";

import { Prisma } from "@prisma/client";
import { formatCurrency } from "@/utils/format";

type CartItems = Prisma.CartGetPayload<{
  include: { cartItems: { include: { product: true } } };
}>;

function CartButton() {
  const { numItemsInCart, fetchCartNumber } = useCart();
  const [cartData, setCartData] = useState<CartItems>();

  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/products?type=fetchOrCreateCart");
      setCartData(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const { user } = useUser();
  useEffect(() => {
    fetchCartNumber();

    fetchCartData();
  }, [fetchCartNumber]);
  return (
    <Link href="/cart">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">
            <FaShoppingCart />

            <span className=" rounded-full text-black  bg-primary w-6 h-6 flex items-center justify-center text-xs">
              {user ? numItemsInCart : 0}
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">
          {cartData?.numItemsInCart ? (
            <div>
              {cartData.cartItems.map((item) => {
                const image = item.product.image;
                const amount = item.amount;
                const price = item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between space-x-4 pb-2"
                  >
                    <Image
                      alt={item.id}
                      width={100}
                      height={80}
                      priority
                      src={image}
                      className="w-[100px] h-[100px] rounded-md border object-cover"
                    />
                    <div >
                      <h4 className="text-sm font-semibold">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Amount: x{amount}
                      </p>
                      <div className="">
                        <span className="font-bold text-lg">
                          {formatCurrency(price)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1 className="text-center">Empty cart</h1>
          )}
        </HoverCardContent>
      </HoverCard>
    </Link>
  );
}
export default CartButton;
