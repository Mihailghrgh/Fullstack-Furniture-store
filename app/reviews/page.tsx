import ReviewPage from "@/components/reviews/ReviewPage";
import { Suspense } from "react";
import ReviewLoading from "./loading";

function ReviewsPage() {
  return (
    <Suspense fallback={<ReviewLoading/>}>
      <ReviewPage />
    </Suspense>
  ); 
  
}
export default ReviewsPage;
