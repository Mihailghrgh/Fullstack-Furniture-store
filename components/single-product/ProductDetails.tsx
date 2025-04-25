"use client";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";

type Prop = {
  name: string;
  image: string;
  company: string;
  description: string;
  price: number;
  id: string;
};

function ProductDetails({ data }: { data: Prop }) {
  const { name, image, company, description, price, id } = data;

  return (
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
        <div className="gap-x-8 flex justify-between">
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <div className="gap-x-2 flex items-end">
            <FavoriteToggleButton productId={id} />
            <ShareButton productId={id} name={name} />
          </div>
        </div>
        <ProductRating productId={id} />
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            By <span className="font-bold text-foreground">{company}</span>
          </p>
        </div>
        <h4 className="mt-2 text-md inline-block rounded text-2xl font-bold">
          {formatCurrency(price)}
        </h4>
        <p className=" leading-8 text-muted-foreground pt-10">{description}</p>
        <AddToCart productId={id} />
      </div>
    </div>
  );
}
export default ProductDetails;
