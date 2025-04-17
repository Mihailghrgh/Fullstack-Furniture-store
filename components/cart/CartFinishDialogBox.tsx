"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import axios from "axios";
import { Order } from "@prisma/client";
import { formatCurrency } from "@/utils/format";

const designButton = "w-full bg-blue-600 hover:bg-blue-700 text-white rounded";

export function ThankYouDialog() {
  const [open, setOpen] = useState(true);
  const [orderDetails, setOrderDetails] = useState<Order>();

  const fetchOrderData = async () => {
    try {
      const { data } = await axios.get(
        "/api/products?type=findMostRecentOrder"
      );

      console.log(data);
      setOrderDetails(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (!orderDetails) {
    return null;
  }

  const orderDate = new Date(orderDetails?.createdAt).toDateString();
  const orderId = orderDetails.id.slice(0,8)
  const orderTotal = formatCurrency(orderDetails.orderTotal); 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl sm:text-2xl font-semibold mt-4">
            Thank you for your order!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your order has been confirmed and will be shipped soon.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3 py-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">Order #{orderId}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {orderDate}
                </p>
              </div>
              <p className="text-sm font-medium">{orderTotal}</p>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            A confirmation email has been sent to your email address.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
          <Link
            href={"/products"}
            className="w-auto sm:w-auto sm:flex-1 mt-2 md:mt-0"
          >
            <Button className={designButton} onClick={() => setOpen(false)}>
              Continue Shopping
            </Button>
          </Link>

          <Link
            href="/orders"
            className="w-auto sm:w-auto sm:flex-1 mt-2 md:mt-0"
          >
            <Button variant="outline" className="w-full ">
              View Order Details
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
