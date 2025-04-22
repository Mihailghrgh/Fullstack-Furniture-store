import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import Image from "next/image";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
    createdAt: Date;
  };
  children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  const date = new Date(reviewInfo.createdAt).toDateString();
  return (
    <Card className="relative mt-8">
      {/* <div className="absolute right-3 top-10 -translate-y-1/2">
        <h1>{date}</h1>
      </div> */}
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            priority
            width={120}
            height={120}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div className="ml-4 ">
            <h3 className="text-sm capitalize mb-1 font-bold">
              {reviewInfo.name} -{" "}
              <span className="text-sm font-light tracking-tight">{date}</span>
            </h3>

            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-1 md:top-3 right-3">{children}</div>
    </Card>
  );
}
export default ReviewCard;
