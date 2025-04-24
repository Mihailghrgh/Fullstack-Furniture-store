"use client";

import ProductsGrid from "./ProductsGrid";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../global/SectionTitle";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import LoadingContainer from "../global/LoadingContainer";
import { useDebouncedCallback } from "use-debounce";

function ProductsContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams.get("search") || "default";

  const handleInputChange = useDebouncedCallback((e: any) => {
    e.preventDefault();
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.set("search", "");
    }

    router.push(`?${params.toString()}`);
  }, 350);

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/products?type=searching", {
        params: { searchTerm },
      });

      return data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: fetchProductData,
    staleTime: 1000 * 60,
  });

  if (isError) {
    console.log(error);
    
    return <h1>isError....</h1>;
  }

  return (
    <>
      <div className="flex flex-col grid-cols-1 justify-center items-center">
        <SectionTitle
          text3="Super Fly"
          text="Thank you for visiting! Checkout out our products."
        />

        <Input
          placeholder="Search products..."
          className="bg-secondary text-center w-full md:w-96 mt-10 hover:shadow-lg transition duration-300"
          onChange={handleInputChange}
        />
      </div>
      <div>
        {isLoading ? <LoadingContainer /> : <ProductsGrid products={data} />}
      </div>
    </>
  );
}
export default ProductsContainer;
