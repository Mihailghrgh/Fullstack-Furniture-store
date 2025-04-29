"use client";
import axios from "axios";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "../reviews/ReviewCard";
import SubmitReview from "../reviews/SubmitReview";
import { useQuery } from "@tanstack/react-query";
import LoadingTable from "../global/LoadingTable";
import { useQueryClient } from "@tanstack/react-query";
import { Review } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";

function ProductReviews({ productId }: { productId: string }) {
  const [showFirstBox, setShowFirstBox] = useState(true);

  const queryClient = useQueryClient();
  const handleFetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?type=productReviews&id=${productId}`
      );

      return data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["review", productId],
    queryFn: handleFetchReviews,
    staleTime: 1000 * 60,
  });

  const revalidateQuery = async () => {
    await handleFetchReviews();
    queryClient.invalidateQueries({ queryKey: ["review", productId] });
    setShowFirstBox(false);
  };

  if (isLoading) {
    <LoadingTable />;
  }

  if (isError) {
    console.log(error);
    return <SectionTitle text="There was an error..." />;
  }

  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" text3="Super Fly" />
      <p className="pt-2 text-center font-light">
        We’d love to hear what you think! Share your honest thoughts about the
        product — how it helped, what you enjoyed, or what could be better. Your
        feedback makes a big difference for future customers and helps us
        improve. Thank you for taking the time to leave a review!
      </p>
      <SubmitReview
        productId={productId}
        handleRefetch={revalidateQuery}
        showFirstBox={showFirstBox}
        setShowFirstBox={setShowFirstBox}
      />
      <div className="grid md:grid-cols-2 gap-8">
        {data?.map((review: Review) => {
          const { comment, rating, authorImageUrl, authorName, createdAt } =
            review;

          const reviewInfo = {
            comment,
            rating,
            createdAt,
            image: authorImageUrl,
            name: authorName,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
export default ProductReviews;
