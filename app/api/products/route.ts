import db from "@/utils/db";
import { NextResponse } from "next/server";
// GET /api/products
export async function GET() {
  const products = await db.product.findMany({
    where: { featured: true },
  });

  return NextResponse.json(products);;
}
