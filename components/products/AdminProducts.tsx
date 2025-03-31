"use client";
import EmptyList from "@/components/global/EmptyList";
import Link from "next/link";
import axios from "axios";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Product } from "@prisma/client";
import LoadingContainer from "../global/LoadingContainer";

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/products?type=admin");

      if (data === "unidentified") {
        redirect("/");
      }

      setProducts(data);
    };
    getData();
  }, []);

  if (!products) {
    return <LoadingContainer />;
  }

  if (products.length === 0) {
    return <EmptyList heading="Nothing here" />;
  }
  return (
    <section>
      <h1 className="text-center capitalize mb-5 text-muted-foreground">total products : {products.length}</h1>
      <Table>
    
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => {
            const { id: productId, name, company, price } = item;

            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/product/${productId}`}
                    className="underline capitalize tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2"></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
export default AdminProducts;
