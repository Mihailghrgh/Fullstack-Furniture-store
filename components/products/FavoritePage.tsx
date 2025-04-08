"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Favorite } from "@prisma/client";

import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "./ProductsGrid";
import FavoriteLoading from "@/app/favorites/loading";

function FavoritePage() {
  const [favProducts, setFavProducts] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchFavoriteData = async () => {
    try {
      const { data } = await axios.get("/api/products?type=allFavorite");
      setFavProducts(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFavoriteData();
  }, []);

  if (loading) {
    return <FavoriteLoading />;
  }

  if (favProducts.length === 0) {
    return (
      <SectionTitle text="Nothing here...Add some products to your favorite page" />
    );
  }
  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favProducts.map((fav) => fav.product)} />
    </div>
  );
}
export default FavoritePage;
