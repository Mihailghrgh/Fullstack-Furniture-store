import ProductsContainer from "@/components/products/ProductsContainer";

type searchParams = {
  searchParams: Promise<{ layout?: string; search?: string }>;
};

async function ProductsPage({ searchParams }: searchParams) {
  const { layout } = (await searchParams) || "grid";
  const { search } = (await searchParams) || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />;
    </>
  );
}
export default ProductsPage;
