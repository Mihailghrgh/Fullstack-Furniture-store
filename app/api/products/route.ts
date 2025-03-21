import db from "@/utils/db";
import { NextResponse } from "next/server";
// GET /api/products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const search = searchParams.get("search");
  console.log(type);

  let result;
  switch (type) {
    case "featured":
      result = await db.product.findMany({
        where: { featured: true },
      });
      break;
    case "searched":
      console.log(type);

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
