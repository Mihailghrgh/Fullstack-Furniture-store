"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

type Reviews = {
  rating: string;
  count: Number;
};

function ProductRating({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Reviews>();

  const handleRating = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?type=productRating&id=${productId}`
      );

      setReviews(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRating();
  }, []);

  const className = `flex gap-2 items-center text-md mt-1 mb-2`;
  const countValue = `${
    reviews?.count === 0 ? "No reviews" : `${reviews?.count} reviews`
  }`;

  console.log(reviews?.count);

  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {reviews?.count === 0 ? "No reviews" : `${reviews?.rating} (${reviews?.count}) reviews`}
    </span>
  );
}
export default ProductRating;
