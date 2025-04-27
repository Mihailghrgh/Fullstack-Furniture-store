"use client";

import { ArrowLeft, Package, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SingleOrderDetails() {
  // In a real app, you would fetch the order details based on the ID
  

  // Mock data for the example
  const orderDetails = {
    id: '#123123123',
    date: "April 12, 2023",
    status: "Delivered",
    deliveryDate: "April 15, 2023",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        company: "SoundWave",
        price: 249.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 1,
      },
      {
        id: "2",
        name: "Bluetooth Portable Speaker",
        company: "SoundWave",
        price: 129.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 1,
      },
    ],
    shipping: 8.99,
    tax: 38.0,
  };

  const subtotal = orderDetails.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + orderDetails.shipping + orderDetails.tax;

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to orders</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Order {orderDetails.id}
          </h1>
          <p className="text-muted-foreground">Placed on {orderDetails.date}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Download Invoice</Button>
          <Button>Track Package</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
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
                  {orderDetails.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md border object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.company}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <address className="not-italic text-muted-foreground">
                    {orderDetails.shippingAddress.name}
                    <br />
                    {orderDetails.shippingAddress.street}
                    <br />
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                    <br />
                    {orderDetails.shippingAddress.country}
                  </address>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Delivery Details</h3>
                  <div className="text-muted-foreground">
                    <p>Status: {orderDetails.status}</p>
                    <p>Delivery Date: {orderDetails.deliveryDate}</p>
                    <p>Shipping Method: Standard Shipping</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${orderDetails.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Payment Method</h3>
                  <p className="text-muted-foreground">
                    {orderDetails.paymentMethod}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Billing Address</h3>
                  <address className="not-italic text-muted-foreground">
                    {orderDetails.shippingAddress.name}
                    <br />
                    {orderDetails.shippingAddress.street}
                    <br />
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                    <br />
                    {orderDetails.shippingAddress.country}
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
