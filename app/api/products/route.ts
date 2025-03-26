import db from "@/utils/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import jacket from "/public/images/jacket.png"

////Logic kept in here for switch cases of different search params
////Instead of action because of issues with accessing base code on a request keeping it simple as an api request after an axios get request
////Axios get request will either be simple requests where searching for the params and setting them to the requested
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const id = searchParams.get("id");

  let result;
  switch (type) {
    case "featured":
      result = await db.product.findMany({
        where: { featured: true },
      });
      break;

    case "unique":
      if (!id) {
        return new Response("Id is not available", { status: 400 });
      }
      result = await db.product.findUnique({
        where: { id: id },
      });
      break;

    case "searching":
      if (!search) {
        result = await db.product.findMany({
          orderBy: { createdAt: "desc" },
        });
      } else {
        result = await db.product.findMany({
          where: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
            ],
          },
          orderBy: { createdAt: "desc" },
        });
      }
      break;
    default:
      result = await db.product.findMany();
      break;
  }

  return NextResponse.json(result);
}

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string }>> {
  let newData = await request.formData();
  const data = Object.fromEntries(newData);

  const name = data.name as string;
  const company = data.company as string;
  const description = data.description as string;
  const image = data.image as File;
  const price = Number(data.price as string);
  const featured = Boolean(data.featured as string);

  const { userId } = await auth();

  if (!userId) redirect("/");

  try {
    await db.product.create({
      data: {
        name,
        company,
        description,
        price,
        image: "/images/jacket.png",
        featured,
        clerkId: userId,
      },
    });
    return NextResponse.json({ message: "created" });
  } catch (error: any) {
    return NextResponse.json({ message: error?.response?.data?.message });
  }
}
