"use server";

import SingleOrderDetails from "@/components/orders/id/SingleOrderPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function SingleOrderPage({ params }: PageProps) {
  const { id } = await params;
  return <SingleOrderDetails params={id} />;
}
export default SingleOrderPage;
