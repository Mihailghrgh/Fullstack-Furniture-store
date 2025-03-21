import db from "@/utils/db";
import { NextResponse } from "next/server";
// GET /api/products

////Logic kept in here for switch cases of different search params
////Instead of action because of issues with accessing base code on a request keeping it simple as an api request after an axios get request
////Axios get request will either be simple requests where searching for the params and setting them to the requested
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  let result;
  switch (type) {
    case "featured":
      result = await db.product.findMany({
        where: { featured: true },
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
