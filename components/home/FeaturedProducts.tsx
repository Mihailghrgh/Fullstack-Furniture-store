"use client";
import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";

function FeaturedProducts() {
  const [featuredProd, setFeaturedProd] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios("/api/products");
      setFeaturedProd(res.data)
    };
    getProducts();
  }, []);

  // const products = await fetchFeaturedProducts();
  if (featuredProd.length === 0) return <EmptyList />;
  return (
    <section className="pt-24">
      <SectionTitle
        text="Super Fly provides"
        text1="quality furniture."
      />
      <ProductsGrid products={featuredProd} />
    </section>
  );
}
export default FeaturedProducts;
