"use client";
import { Review } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        ` /api/products?type=productReviews&id=${productId}`
      );
      
      setReviews(data);
    } catch (error: any) {
      console.log(error?.error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" text3="Super Fly" />
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          const reviewInfo = {
            comment,
            rating,
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
