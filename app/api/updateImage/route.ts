import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { validateWithZodSchema, imageSchema } from "@/utils/schema";
import { uploadImage } from "@/utils/supabase";
import { deleteImage } from "@/utils/supabase";

export async function POST(
  request: NextRequest
): Promise<
  NextResponse<{ message: string; orderId?: string; cartId?: string }>
> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "updateImage": {
      try {
        const { userId } = await auth();
        if (!userId) {
          return NextResponse.json({ message: "Action not allowed!" });
        }

        const newData = await request.formData();
        const data = Object.fromEntries(newData);
        console.log("Data: ", data);

        const imageUrl = data.url as string;
        const image = data.image as File;
        const productId = data.id as string;

        //Validate Image
        const validateFile = validateWithZodSchema(imageSchema, { image });

        if (!productId) {
          return NextResponse.json({
            message: "Id not found for product , Action uncompleted",
          });
        }

        const fullPath = await uploadImage(validateFile.image);

        await deleteImage(imageUrl);

        await db.product.update({
          where: {
            id: productId,
          },
          data: {
            image: fullPath,
          },
        });

        return NextResponse.json({ message: "Image has been updated!" });
      } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: `${error}` });
      }
    }
  }

  return NextResponse.json({ message: "Action done" });
}
