"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/utils/numItemsInCart";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

function CartButton() {
  const { numItemsInCart, fetchCartNumber } = useCart();

  const { user } = useUser();
  useEffect(() => {
    fetchCartNumber();
  }, [fetchCartNumber]);
  return (
    <Button
      asChild
      variant="outline"
      size="default"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <FaShoppingCart />
        <span className="absolute -top-3 -right-3  rounded-full text-black  bg-primary w-6 h-6 flex items-center justify-center text-xs">
          {user ? numItemsInCart : 0}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
