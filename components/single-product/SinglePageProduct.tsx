"use client";

import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import axios from "axios";
import ShareButton from "@/components/single-product/ShareButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import LoadingContainer from "../global/LoadingContainer";

function SinglePageProduct({ params }: { params: string }) {
  const [singleProduct, setSingleProduct] = useState<Product>();
  const [id, setId] = useState<string>("");
  

  const handleFetchData = async () => {
    try {
      const id = params;
      const { data } = await axios.get(`/api/products?type=unique&id=${id}`);
      setId(id);
      setSingleProduct(data);
    } catch (error: any) {
      console.log();
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [params]);

  console.log(singleProduct);

  if (!singleProduct) {
    return <LoadingContainer />;
  }

  if (!id) {
    return <LoadingContainer />;
  }
  const { name, image, company, description, price } = singleProduct;

  const dollarsAmount = formatCurrency(price);
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative w-full h-64 lg:h-full">
          <Image
            src={image}
            alt={name}
            fill
            // width={500} // Example width
            // height={200} // Example height
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="rounded object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-x-2 ">
              <FavoriteToggleButton productId={id} />
              <ShareButton productId={id} name={name} />
            </div>
          </div>
          <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md inline-block p-2 rounded">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
      <ProductReviews productId={id} />
    </section>
  );
}
export default SinglePageProduct;
