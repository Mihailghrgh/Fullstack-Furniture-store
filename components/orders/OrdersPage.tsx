"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderItem from "./OrderItemProp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import SectionTitle from "../global/SectionTitle";

type Orders = Prisma.OrderGetPayload<{ include: { orderItems: true } }>;

function UserOrdersPage() {
  const [orders, setOrders] = useState<Orders[]>();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/products?type=fetchUserOrders");
      setOrders(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders) {
    return <SectionTitle text="No orders placed by any user yet" />;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
          <p className="text-muted-foreground">
            View and track all your past orders
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {orders.map((item) => {
        const { id, createdAt, orderTotal, shipping } = item;

        const orderItem = item.orderItems.map((newItem) => {
          const productId = newItem.productId;
          const price = newItem.price;
          const quantity = newItem.quantity;

          return { productId, price, quantity };
        });

        const orderDate = new Date(createdAt).toDateString();

        return (
          <div key={id} className=" pb-8">
            <OrderItem
              id={id}
              date={orderDate}
              status="In progress"
              shipping={shipping}
              items={orderItem}
              orderTotal={orderTotal}
            />
          </div>
        );
        // return <SectionTitle text="Section title" />;
      })}
    </div>
  );
}

export default UserOrdersPage;
