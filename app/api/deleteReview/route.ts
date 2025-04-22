import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function POST(request: NextResponse) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "deleteReview": {
      try {
        const { userId } = await auth();

        if (!userId) {
          return NextResponse.json({
            message: "No userId present to complete this action",
          });
        }
        let bodyData = await request.json();
        const reviewId = bodyData.data;

        await db.review.delete({
          where: {
            id: reviewId,
            clerkId: userId,
          },
        });

        return NextResponse.json({ message: "Product Delete" });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error });
      }
    }
  }
}
