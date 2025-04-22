import { Separator } from "../ui/separator";
import { formatCurrency } from "@/utils/format";
import OrderItemImage from "./OrderItemImage";
import OrderItemNameAndPrice from "./OrderItemNameAndPrice";

interface OrderItemDetailsProps {
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
  shipping: number;
  subTotal: number;
  total: number;
}

function OrderItemDetails({
  items,
  shipping,
  subTotal,
  total,
}: OrderItemDetailsProps) {
    
  return (
    <div className="p-4 pt-0 mt-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex flex-col sm:flex-row gap-4">
            <OrderItemImage productId={item.productId} />
            <OrderItemNameAndPrice
              quantity={item.quantity}
              productId={item.productId}
            />
            {/*ITEM PRICE] */}
            <div className="text-right">
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Order Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderItemDetails;
