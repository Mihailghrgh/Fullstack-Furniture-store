import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import OrderItemDetails from "./OrderItemDetails";
import { CalendarDays } from "lucide-react";

interface OrderItemProps {
  id: string;
  date: string;
  status: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  shipping: number;
  orderTotal: number;
}

function OrderItem({
  id,
  date,
  status,
  items,
  shipping,
  orderTotal,
}: OrderItemProps) {
  console.log(id, date, status, items, shipping);

  console.log();

  return (
    <Card>
      <CardContent className="p-0">
        <div className="bg-muted/50 p-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <div>#{id.slice(0, 8)}</div>
              </h3>
              <span className="text-white inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-orange-500  hover:bg-orange-800">
                {status}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Ordered on {date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/orders/${id}`}>View Order Details</Link>
            </Button>
          </div>
        </div>

        <OrderItemDetails
          items={items}
          shipping={shipping}
          subTotal={123}
          total={orderTotal}
        />
      </CardContent>
    </Card>
  );
}

export default OrderItem;
