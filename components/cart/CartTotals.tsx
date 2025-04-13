import { Card, CardTitle , CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@prisma/client";

function CartTotals({ cart }: { cart: Cart }) {
  console.log(cart);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>123</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>123</span>
        </div>

        {cart.shipping > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>123</span>
          </div>
        )}

        {/* {cart.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-green-600">
              -{formatPrice(discount, currency)}
            </span>
          </div>
        )} */}

        <Separator className="my-2" />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="text-lg">123</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>All prices include VAT</span>
      </CardFooter>
    </Card>
  );
}
export default CartTotals;
