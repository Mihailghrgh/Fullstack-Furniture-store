"use client";
import { Dispatch, useState, SetStateAction } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "@/components/reviews/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Review } from "@prisma/client";

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] =
    useState<boolean>(false);

  const { user } = useUser();

  return (
    <div>
      <div className="flex justify-center my-2">
        <Button
          size="lg"
          className="capitalize m-4 rounded-none"
          onClick={() => {
            setIsReviewFormVisible(!isReviewFormVisible);
          }}
        >
          leave review
        </Button>
      </div>

      {isReviewFormVisible && (
        <Card className="relative mb-8">
          <FormContainer type="createReview" productId="" favoriteId="">
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" labelText="" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding product"
            />
            <SubmitButton className="m-6 bg-blue-600 hover:bg-blue-700 text-white rounded-none" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
export default SubmitReview;
