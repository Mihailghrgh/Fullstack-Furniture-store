////ACTIONS IN nextJS using SupaBase / prisma to fetch the products data
// "use server";

// import db from "@/utils/db";
// import { NextResponse } from "next/server";
// import axios from "axios";

// export const fetchFeaturedProducts = async () => {
//   const products = await db.product.findMany({ where: { featured: true } });

//   return products;
// };

// export const fetchAllProducts = async () => {
//   return db.product.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };

// ////This is a way to do it with actions if ever needed
// export async function createProductAction(prevState: any, formData: FormData) {
//   try {
//     const data = Object.fromEntries(formData.entries());

//     const response = await axios.post("/api/products");
//     return { message: response.data.message || "Product Successfully created" };
//   } catch (error: any) {
//     return {
//       message: error.response?.data?.message || "Product Successfully created",
//     };
//   }
// }
