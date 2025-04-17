"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

function OrderItemImage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  const fetchUniqueProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?type=unique&id=${productId}`
      );
      setProduct(data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUniqueProduct();
  }, []);
  return (
    <div className="flex-shrink-0 w-[100px] h-[80px] relative">
      {loading || !product ? (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-md" />
      ) : (
        <div>
          <Image
            src={product.image}
            alt={productId}
            fill
            className="rounded-md border object-cover"
          />
        
        </div>
      )}
    </div>
  );
}
export default OrderItemImage;
