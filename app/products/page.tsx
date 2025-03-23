import ProductsContainer from "@/components/products/ProductsContainer";

type searchParams = {
  searchParams: { layout?: string; search?: string };
};

function ProductsPage({ searchParams }: searchParams) {
  const { layout } = searchParams || "grid";
  const { search } = searchParams || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />;
    </>
  );
}
export default ProductsPage;
