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
import { Suspense, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Product } from "@prisma/client";
import LoadingContainer from "../global/LoadingContainer";
import { IconButton } from "../form/Buttons";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
import LoadingTable from "../global/LoadingTable";

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
    return <LoadingTable rows={10}/>;
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
              <TableHead className="ml-0 md:flex items-center md:ml-8">
                Actions
              </TableHead>
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
                  <Link href={`/admin/products/${productId}/edit`}>
                    <Button variant="ghost">
                      <IconButton actionType="edit" productId={productId} />
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={() => DeleteProducts(productId)}
                  >
                    <IconButton actionType="delete" productId={productId} />
                  </Button>
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
