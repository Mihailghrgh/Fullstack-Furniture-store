import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { validateWithZodSchema, reviewSchema } from "@/utils/schema";

export async function POST(
  request: NextRequest
): Promise<
  NextResponse<{ message: string; orderId?: string; cartId?: string }>
> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "createReview": {
      try {
        const { userId } = await auth();

        if (!userId) {
          return NextResponse.json({
            message: "No user active please login to create a review ",
          });
        }
        const newData = await request.formData();
        const data = Object.fromEntries(newData);

        const validateFields = validateWithZodSchema(reviewSchema, data);

        await db.review.create({
          data: { ...validateFields, clerkId: userId },
        });
        return NextResponse.json({ message: "Your review has been published" });
      } catch (error: any) {
        console.log(error);

        return NextResponse.json({ message: error });
      }
    }
  }

  return NextResponse.json({ message: "Action done" });
}
