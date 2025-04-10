"use client";
import { Review } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";
import SubmitReview from "./SubmitReview";
import { useUser } from "@clerk/nextjs";

function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        ` /api/products?type=productReviews&id=${productId}`
      );

      setReviews(data);
      setRefresh(false);
    } catch (error: any) {
      console.log(error?.error.message);
      setRefresh(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, refresh]);

  const handleNewReview = () => {

    setRefresh(true);
  };

  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" text3="Super Fly" />
      <p className="pt-2 text-center font-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis tempora illum aliquam possimus quidem odit officiis exercitationem consequuntur necessitatibus, ut, iure, recusandae facere iusto dolorum voluptas sint laborum voluptatibus. Soluta!</p>
      <SubmitReview productId={productId} handleRefetch={handleNewReview} />
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review) => {
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
