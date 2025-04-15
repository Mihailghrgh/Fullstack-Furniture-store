"use server";
import SinglePageProduct from "@/components/single-product/SinglePageProduct";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function SingleProduct({ params }: PageProps) {
  ////Since this is a server component and not a client one, no need to call axios await and can call directly the db method
  //// SERVER side safe for calling directly
  //// Client component ALWAYS AXIOS or API route for no leaks in the code base

  const { id } = await params;
  return <SinglePageProduct />;
}
export default SingleProduct;
