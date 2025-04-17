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
    <div>
      <div className="flex-1">
        {/*ITEM NAME */}
        <h4 className="font-medium">{product?.name}</h4>
        {/*ITEM COMPANY */}
        <p className="text-sm text-muted-foreground">{product?.company}</p>
        {/*ITEM QUANTITY */}
        <div className="flex items-center text-sm">
          <span>Quantity: {quantity}</span>
        </div>
      </div>
    </div>
  );
}
export default OrderItemNameAndPrice;
