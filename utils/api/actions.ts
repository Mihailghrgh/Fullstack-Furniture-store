import { Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import db from "@/utils/db";

// GET /api/products
export async function GET() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products;
}

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({ where: { featured: true } });

  return products;
};

export const fetchAllProducts = () => {
  return db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
