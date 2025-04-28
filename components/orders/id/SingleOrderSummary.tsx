"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import { Prisma } from "@prisma/client";

type SingleOrder = Prisma.OrderGetPayload<{
  include: { orderItems: { include: { product: true } } };
}>;

function SingleOrderSummary({ order }: { order: SingleOrder }) {
  const priceArray = order.orderItems.map((item) => {
    const total = item.price * item.quantity;
    return total;
  });
  const subTot = priceArray.reduce((acc, curr) => acc + curr);

  return (
    <div>
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subTot)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(order.orderTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default SingleOrderSummary;
