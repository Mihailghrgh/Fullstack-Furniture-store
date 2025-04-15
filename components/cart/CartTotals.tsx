import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import { Cart } from "@prisma/client";

function CartTotals({ cart }: { cart: Cart }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(cart.cartTotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(cart.tax)}</span>
        </div>

        {cart.shipping > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(cart.shipping)}</span>
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
          <span className="text-lg">{formatCurrency(cart.orderTotal)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>All prices include VAT</span>
      </CardFooter>
    </Card>
  );
}
export default CartTotals;
