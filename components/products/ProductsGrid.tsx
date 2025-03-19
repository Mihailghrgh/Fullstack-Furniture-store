//! FIRST WAY TO IMport a type model with normal payload / parameters
type Products = {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
};
import { formatCurrency } from "@/utils/format";
//! Second WAY with auto import from Prisma smart GG WP NO return

import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => {
        const {
          id: productId,
          name,
          image,
          price,
        } = item;
        const dollarsAmount = formatCurrency(price);
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-300 bg-accent">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw , (max-width:1200px) , 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="capitalize text-lg">{name}</h2>
                    <p className="mt-2 text-accent-foreground">
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={productId}/>
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsGrid;
