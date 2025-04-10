"use client";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "@/components/reviews/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function SubmitReview({
  productId,
  handleRefetch,
}: {
  productId: string;
  handleRefetch: () => void;
}) {
  const [isReviewFormVisible, setIsReviewFormVisible] =
    useState<boolean>(false);

  const { user } = useUser();

  return (
    // <Dialog>
    //   {user && (
    //     <div className="flex justify-center my-2">
    //       <DialogTrigger asChild>
    //         <Button
    //           size="lg"
    //           className="capitalize m-4 rounded-none"
    //           onClick={() => {
    //             setIsReviewFormVisible(!isReviewFormVisible);
    //           }}
    //         >
    //           leave review
    //         </Button>
    //       </DialogTrigger>
    //     </div>
    //   )}

    //   {isReviewFormVisible && (
    //     <DialogContent className="w-full max-w-md mx-auto">
    //       <DialogHeader>
    //         <DialogTitle className="text-center">Leave a review</DialogTitle>
    //         <DialogDescription className="text-center">
    //           Thank you for leaving a review for this product.
    //         </DialogDescription>
    //         <FormContainer
    //           type="createReview"
    //           productId=""
    //           favoriteId=""
    //           handleRefetch={handleRefetch}
    //         >
    //           <input type="hidden" name="productId" value={productId} />
    //           <input
    //             type="hidden"
    //             name="authorName"
    //             value={user?.firstName || "user"}
    //           />
    //           <input
    //             type="hidden"
    //             name="authorImageUrl"
    //             value={user?.imageUrl}
    //           />
    //           <RatingInput name="rating" labelText="" />
    //           <TextAreaInput
    //             name="comment"
    //             labelText="feedback"
    //             defaultValue="Outstanding product"
    //           />
    //           <div className="flex justify-center">
    //             <SubmitButton className="m-6 bg-blue-600 hover:bg-blue-700 text-white rounded-none items-center size-lg" />
    //           </div>
    //         </FormContainer>
    //       </DialogHeader>
    //     </DialogContent>
    //   )}
    // </Dialog>`
    <div className="flex items-center justify-center my-2">
      <Dialog>
        {user && (
          <DialogTrigger asChild>
            <Button size="lg" className="flex items-center justify-center my-2">
              Leave a Review
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="w-full max-w-md mx-auto items">
          <DialogHeader>
            <DialogTitle className="text-center">
              Share your thoughts!
            </DialogTitle>
            <DialogDescription className="text-center">
              Let people know your experience with the product. Your opinion
              counts!
            </DialogDescription>
          </DialogHeader>

          <FormContainer
            type="createReview"
            productId=""
            favoriteId=""
            handleRefetch={handleRefetch}
          >
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
            <SubmitButton className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-none size-lg w-full" />
          </FormContainer>

          {/* <DialogFooter className="absolute right-40 top-96">
            <SubmitButton className="m-6 bg-blue-600 hover:bg-blue-700 text-white rounded-none items-center size-lg w-full" />
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default SubmitReview;
