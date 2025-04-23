"use client";

import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

function ProductsContainer({
  layout,
  search,
}: {
  layout: string | undefined;
  search: string | undefined;
}) {
  // const [products, setProducts] = useState<Product[]>([]);

  // const [_key, { search, layout }] = queryKey;
  // let url = `/api/products`;
  // const params = new URLSearchParams();
  // if (search) params.set("search", search);
  // if (layout) params.set("layout", layout);
  // if (search) params.set("type", "searching");

  // url += `?${params.toString()}`;

  const fetchProductData = async (context: any) => {
    const { data } = await axios.get("/api/products?type=searching");

    return data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductData,
    staleTime: 1000 * 60,
    refetchOnReconnect: false,
  });

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     let url = `/api/products`;
  //     const params = new URLSearchParams();
  //     if (search) params.set("search", search);
  //     if (layout) params.set("layout", layout);
  //     if (search) params.set("type", "searching");

  //     url += `?${params.toString()}`;
  //     const { data } = await axios.get(url);
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, [search, layout]);

  // const totalProducts = products.length;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>isError....</h1>;
  }
  const searchTerm = search ? `&search=${search}` : "";

  console.log(data);

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          {/* <h4 className="font-medium text-lg">
            {products.length} product{products.length > 1 && "s"}
          </h4> */}
          <div className="flex gap-x-4">
            {/* GRID BUTTON */}
            <Button
              size="icon"
              asChild
              variant={layout === "grid" ? "default" : "outline"}
              className="rounded-none"
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            {/* LIST BUTTON */}
            <Button
              size="icon"
              asChild
              variant={layout === "list" ? "default" : "outline"}
              className="rounded-none"
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {/* {products.length === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry , no products matched your search
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )} */}
        <ProductsGrid products={data} />
      </div>
    </>
  );
}
export default ProductsContainer;
