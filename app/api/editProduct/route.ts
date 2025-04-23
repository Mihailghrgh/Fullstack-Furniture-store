import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { validateWithZodSchema, productSchema } from "@/utils/schema";
validateWithZodSchema;

export async function POST(
  request: NextRequest
): Promise<
  NextResponse<{ message: string; orderId?: string; cartId?: string }>
> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "edit": {
      try {
        const { userId } = await auth();
        if (!userId) {
          return NextResponse.json({ message: "Action not allowed" });
        }
        //This way if you want to pass the data as { data: name, company, price , description , image}
        // const { data } = await request.json();
        // const { name, price, description, company, id } = data;

        //Post method using the Object form a form and extracting it
        const newData = await request.formData();
        const formData = Object.fromEntries(newData);
        console.log(formData);

        const validateData = validateWithZodSchema(productSchema, formData);

        if (!validateData.id) {
          return NextResponse.json({
            message: "Id not found for product , Action uncompleted",
          });
        }
        await db.product.update({
          where: { id: validateData.id },
          data: {
            ...validateData,
          },
        });

        return NextResponse.json({ message: "Product has been updated" });
      } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: `${error}` });
      }
    }
  }

  return NextResponse.json({ message: "Action done" });
}
