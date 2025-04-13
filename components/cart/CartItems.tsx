import { CartItem } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { Mode } from "@/utils/type";
import { useState } from "react";

type CartWithProduct = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: true;
      };
    };
  };
}>;

function CartItems({ cartItems }: { cartItems: CartWithProduct }) {
  const [amount, setAmount] = useState(1);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {cartItems.cartItems.map((item) => {
          const { image, name, description, price } = item.product;
          return (
            <div key={item.id} className="flex items-start space-x-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-md border bg-gray-100">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-muted-foreground">{price} each</p>
                <div className="flex items-center space-x-2">
                  <SelectProductAmount
                    mode={Mode.SingleProduct}
                    amount={12}
                    setAmount={setAmount}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="font-medium">{price}</span>
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  X
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
export default CartItems;
