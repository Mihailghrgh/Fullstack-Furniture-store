"use client";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { useState } from "react";
import { Mode } from "@/utils/type";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

type Payload = {
  cartItemId: string;
  quantity: number;
  refetchCartData: () => void;
};

const toastDesign =
  "fixed top-5 left-1/2 transform -translate-x-1/2 w-80 shadow-lg bg-primary-foreground";

function CartProductAmount({ cartItemId, quantity, refetchCartData }: Payload) {
  const [value, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({
      className: toastDesign,
      description: "Changing product amount...",
    });

    try {
      await axios.post("/api/products?type=editCartItemAction", {
        cartItemId,
        value,
      });
    } catch (error: any) {
      console.log(error);
    }
    setAmount(value);
    toast({
      className: toastDesign,
      description: "Product amount changed!",
    });
    refetchCartData();
    setIsLoading(isLoading);
  };
  return (
    <div className="flex flex-col items-start">
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={quantity}
        setAmount={handleAmountChange}
        isLoading={false}
      />
    </div>
  );
}
export default CartProductAmount;
