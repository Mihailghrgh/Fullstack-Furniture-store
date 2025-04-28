"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format";
import { Prisma } from "@prisma/client";
import { Package } from "lucide-react";
import Image from "next/image";

type SingleOrder = Prisma.OrderGetPayload<{
  include: { orderItems: { include: { product: true } } };
}>;

function SingleOrderItems({ order }: { order: SingleOrder }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => {
                console.log(item);

                return null;
              })}
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      alt={item.product.id}
                      src={item.product.image}
                      width={60}
                      height={60}
                      className="rounded-md border object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.product.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.product.price)}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
export default SingleOrderItems;
