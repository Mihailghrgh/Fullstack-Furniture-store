"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import SubmitReviewBox from "../reviewBox/SubmitReviewBox";
import AfterReviewSubmissionBox from "../reviewBox/AfterReviewSubmissionBox";

function SubmitReview({
  productId,
  handleRefetch,
  showFirstBox,
  setShowFirstBox,
}: {
  productId: string;
  handleRefetch: () => void;
  showFirstBox: boolean;
  setShowFirstBox: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center my-2 ">
      <Dialog>
        {user && (
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="flex items-center justify-center my-2"
              onClick={() => setShowFirstBox(true)}
            >
              Leave a Review
            </Button>
          </DialogTrigger>
        )}
        {showFirstBox === true ? (
          <SubmitReviewBox
            productId={productId}
            handleRefetch={handleRefetch}
          />
        ) : (
          <AfterReviewSubmissionBox />
        )}
      </Dialog>
    </div>
  );
}

export default SubmitReview;
