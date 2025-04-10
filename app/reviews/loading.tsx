import { CardHeader, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewLoading() {
  return (
    <section className="grid mg:grid-cols-2 gap-8 mt-4">
      <ReviewLoadingCart />
      <ReviewLoadingCart />
    </section>
  );
}

const ReviewLoadingCart = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[150px] h-4 mb-2" />
            <Skeleton className="w-[150px] h-4" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
export default ReviewLoading;
