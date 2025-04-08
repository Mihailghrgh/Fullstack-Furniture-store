"use server";
import FavoritePage from "@/components/products/FavoritePage";
import { Suspense } from "react";
import FavoriteLoading from "./loading";

function FavoritesPage() {
  return (
    <Suspense fallback={<FavoriteLoading />}>
      <FavoritePage />
    </Suspense>
  );
  
}
export default FavoritesPage;
