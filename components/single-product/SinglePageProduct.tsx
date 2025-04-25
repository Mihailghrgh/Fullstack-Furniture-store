"use client";

import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductReviews from "@/components/single-product/ProductReviews";
import LoadingContainer from "../global/LoadingContainer";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../global/SectionTitle";
import ProductDetails from "./ProductDetails";
import axios from "axios";

function SinglePageProduct({ params }: { params: string }) {
  const fetchSingleProductData = async () => {
    try {
      const singleProduct = await axios.get(
        `/api/products?type=unique&id=${params}`
      );

      return {
        singleProd: singleProduct.data,
      };
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["product" , params],
    queryFn: fetchSingleProductData,
    staleTime: 1000 * 60,
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isError) {
    console.log(error);
    return <SectionTitle text="There has been an error" />;
  }

  return (
    <section key={params}>
      <BreadCrumbs name={data?.singleProd.name} />
      <ProductDetails data={data?.singleProd} />
      <ProductReviews productId={params} />
    </section>
  );
}
export default SinglePageProduct;
