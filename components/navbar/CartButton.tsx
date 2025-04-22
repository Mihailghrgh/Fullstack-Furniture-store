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
import SectionTitle from "../global/SectionTitle";
import { Cart, Prisma } from "@prisma/client";
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
      console.log(data);
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
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <Link href="/cart">
            {" "}
            <FaShoppingCart />
          </Link>
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
              const amount = item.amount
              const price = item.product.price;
    
              console.log(price);

              return (
                <div
                  key={item.id}
                  className="flex justify-between space-x-4 pb-2"
                >
                  <Image
                    alt="123"
                    width={100}
                    height={100}
                    priority
                    src={image}
                    className="rounded-md border object-cover"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      Premium Headphones
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Amount: x{amount}
                    </p>
                    <div className="pt-2">
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
  );
}
export default CartButton;
