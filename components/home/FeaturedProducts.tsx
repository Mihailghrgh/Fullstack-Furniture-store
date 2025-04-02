"use client";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";
import LoadingContainer from "../global/LoadingContainer";
import LoadingTable from "../global/LoadingTable";

function FeaturedProducts() {
  const [featuredProd, setFeaturedProd] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios("/api/products?type=featured");
      setFeaturedProd(res.data);
    };
    getProducts();
  }, []);

  if (featuredProd.length === 0) return <EmptyList heading="Nothing here..." />;
  return (
    <section className="pt-24">
      <SectionTitle text="Super Fly provides" text1="quality furniture." />
      <ProductsGrid products={featuredProd} />
    </section>
  );
}
export default FeaturedProducts;
