"use client";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { useState } from "react";
import { Mode } from "@/utils/type";

type Payload = {
  id: string;
  quantity: number;
};

function CartProductAmount({ id, quantity }: Payload) {
  const [value, setAmount] = useState(quantity);

  const handleAmountChange = async (value: number) => {
    setAmount(value);
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
