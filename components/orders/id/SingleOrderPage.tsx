"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SingleOrderTop from "./SingleOrderTop";
import SingleOrderItems from "./SingleOrderItems";
import SingleOrderShipping from "./SingleOrderShipping";
import SingleOrderSummary from "./SingleOrderSummary";
import SingleOrderPayment from "./SingleOrderPayment";
import LoadingContainer from "@/components/global/LoadingContainer";

export default function SingleOrderDetails({ params }: { params: string }) {
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/order", {
        params: { id: params },
      });

      console.log(data);

      return data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["orderId", params],
    queryFn: fetchData,
    staleTime: 10000 * 60,
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (isError) {
    console.log(error);
    return <h1>Error...</h1>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <SingleOrderTop order={data?.order} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* ITEM DETAILS AND SHIPPING */}
          <SingleOrderItems order={data?.order} />
          <SingleOrderShipping />
        </div>
        {/* PAYMENT AND SUMMARY */}
        <div className="space-y-6">
          <SingleOrderSummary order={data?.order} />
          <SingleOrderPayment last4={data.last4} type={data.type} />
        </div>
      </div>
    </div>
  );
}
