////ACTIONS IN nextJS using SupaBase / prisma to fetch the products data


import db from "@/utils/db";

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
