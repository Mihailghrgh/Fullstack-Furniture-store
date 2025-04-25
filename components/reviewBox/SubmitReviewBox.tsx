"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import FormContainer from "../form/FormContainer";
import RatingInput from "../reviews/RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/Buttons";

function SubmitReviewBox({
  productId,
  handleRefetch,
}: {
  productId: string;
  handleRefetch: () => void;
}) {
  const { user } = useUser();
  return (
    <DialogContent className="w-full max-w-md mx-auto items">
      <div>
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
      </div>
    </DialogContent>
  );
}
export default SubmitReviewBox;
