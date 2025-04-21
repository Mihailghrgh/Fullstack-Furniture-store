import { Product } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function OrderItemNameAndPrice({
  quantity,
  productId,
}: {
  quantity: number;
  productId: string;
}) {
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
    <div className="flex-1 space-y-1">
      {/* ITEM NAME */}
      {product ? (
        <h4 className="font-medium">{product.name}</h4>
      ) : (
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
      )}

      {/* ITEM COMPANY */}
      {product ? (
        <p className="text-sm text-muted-foreground">{product.company}</p>
      ) : (
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      )}

      {/* ITEM QUANTITY */}
      <div className="flex items-center text-sm">
        <span>Quantity: {quantity}</span>
      </div>
    </div>
  );
}
export default OrderItemNameAndPrice;
