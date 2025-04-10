"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

function CartButton() {
  const [numItemsInCart, setNumItemsInCart] = useState(0);

  const fetchItemsInCart = async()=>{
    try{
      const { data } = await axios.get(
        "/api/products?type=getNumberOfCartItems"
      );
      setNumItemsInCart(numItemsInCart)
    }catch(error: any){
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchItemsInCart();
  },[])
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
