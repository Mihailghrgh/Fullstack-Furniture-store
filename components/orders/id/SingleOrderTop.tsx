"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Prisma } from "@prisma/client";

type SingleOrder = Prisma.OrderGetPayload<{
  include: { orderItems: { include: { product: true } } };
}>;

function SingleOrderTop({ order }: { order: SingleOrder }) {

  const date = new Date(order.createdAt).toDateString()
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button variant="outline" size="icon" asChild>
        <Link href="/orders">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to orders</span>
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Order #{order.id.slice(0, 8)}
        </h1>
        <p className="text-muted-foreground">Placed on {date}</p>
      </div>
      <div className="ml-auto flex gap-2">
        <Button variant="outline">Download Invoice</Button>
        <Button>Track Package</Button>
      </div>
    </div>
  );
}
export default SingleOrderTop;
