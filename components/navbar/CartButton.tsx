"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/utils/numItemsInCart";
import { useEffect } from "react";

function CartButton() {
  const { numItemsInCart, fetchCartNumber } = useCart();

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
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
