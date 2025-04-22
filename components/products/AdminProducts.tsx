"use client";
import EmptyList from "@/components/global/EmptyList";
import Link from "next/link";
import axios from "axios";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Product } from "@prisma/client";
import { Button } from "../ui/button";
import LoadingTable from "../global/LoadingTable";
import { LuTrash2 } from "react-icons/lu";
import { PenSquare } from "lucide-react";

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
    return <LoadingTable rows={10} />;
  }

  if (products.length === 0) {
    return <EmptyList heading="Nothing here" />;
  }
  return (
    <Suspense fallback={<LoadingTable />}>
      <section>
        <h1 className="text-center capitalize mb-5 text-muted-foreground">
          total products : {products.length}
        </h1>
        <Table>
          <TableHeader>
            <TableRow className="items-center">
              <TableHead>Product Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="outline">
            {products.map((item) => {
              const { id: productId, name, company, price } = item;

              return (
                <TableRow key={productId} className="">
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
                  <TableCell className="flex justify-between">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <Button variant="ghost">
                        <PenSquare className="text-yellow-400" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => DeleteProducts(productId)}
                    >
                      <LuTrash2 className="text-yellow-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </Suspense>
  );
}

async function DeleteProducts(productId: string) {
  await axios.post("/api/products?type=delete", { data: productId });
  window.location.reload();
}
export default AdminProducts;
