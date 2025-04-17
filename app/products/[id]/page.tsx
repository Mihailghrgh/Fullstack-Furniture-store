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

  //For the future of fetching product Data inside the server component first for better render time
  // const {data} = await axios.get(
  //   `https://furniture-shopping-eta.vercel.app/api/products?type=unique&id=${id}`
  // );

  return <SinglePageProduct params={id} />;
}
export default SingleProduct;
