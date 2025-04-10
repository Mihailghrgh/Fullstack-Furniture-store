"use client";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { Button } from "../ui/button";
import { LuTrash2 } from "react-icons/lu";
import { Suspense } from "react";
import LoadingContainer from "../global/LoadingContainer";

type ReviewWithProduct = Prisma.ReviewGetPayload<{
  include: { product: true };
}>;

function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?type=productReviewsByUser`
      );

      setReviews(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

//   if (reviews.length === 0) {
//     return <SectionTitle text="You have no reviews yet" />;
//   }

  async function DeleteReview({ reviewId }: { reviewId: string }) {
    await axios.post(`/api/products?type=deleteReview`, { data: reviewId });
    fetchReviews();
  }

  return (
    <Suspense fallback={<LoadingContainer />}>
      <SectionTitle text="You reviews" text3="Super Fly" />
      <section className="gird md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating, id } = review;
          const { name, image } = review.product;

          const reviewInfo = { comment, rating, name, image };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <Button
                variant="outline"
                className="hover:text-red-600"
                onClick={() => DeleteReview({ reviewId: id })}
              >
                <LuTrash2 />
              </Button>
            </ReviewCard>
          );
        })}
      </section>
    </Suspense>
  );
}

export default ReviewPage;
