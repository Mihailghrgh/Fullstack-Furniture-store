"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { ProductSignInButton } from "../form/Buttons";

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);

  const { user } = useUser();

  if (!user?.id) {
    return <ProductSignInButton />;
  }
  return (
    <div className="pt-10">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />

      {user.id ? (
        <FormContainer type="addToCartItems" productId="" favoriteId="">
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton
            text="Add to Cart"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
