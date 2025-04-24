import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => {
        const { id: productId, name, image, description, price } = item;
        return (
          <article
            key={productId}
            className="group relative  hover:shadow-lg transition duration-300"
          >
            <Link href={`/products/${productId}`}>
              <Card className="h-full flex flex-col bg-primary-foreground">
                <CardHeader className="p-4 pb-0">
                  <div className="aspect-square relative overflow-hidden rounded-md mb-2">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-xl pl-2">{name}</h3>
                </CardHeader>
                <CardContent className="py-2 flex-grow">
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <span className="font-bold text-lg">
                    {formatCurrency(price)}
                  </span>
                  <Button className="rounded-none bg-blue-600 hover:bg-blue-700 transition text-white">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsGrid;
