import ProductsContainer from "@/components/products/ProductsContainer";

// type searchParams = {
//   searchParams: Promise<{ layout?: string; search?: string }>;
// };

async function ProductsPage() {
  // const { search } = (await searchParams) || "";
  return (
    <>
      <ProductsContainer />
    </>
  );
}
export default ProductsPage;
