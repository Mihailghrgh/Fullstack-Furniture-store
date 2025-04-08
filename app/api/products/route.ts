import db from "@/utils/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
} from "@/utils/schema";
import { deleteImage, uploadImage } from "@/utils/supabase";
import { log } from "util";

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
    case "isAdmin": {
      const userId = searchParams.get("userId");

      const isAdmin = userId === process.env.ADMIN_USER_ID;
      console.log(isAdmin);

      return NextResponse.json(isAdmin);
    }
    case "featured": {
      result = await db.product.findMany({
        where: { featured: true },
      });

      return NextResponse.json(result);
    }

    case "unique": {
      if (!id) {
        return new Response("Id is not available", { status: 400 });
      }
      result = await db.product.findUnique({
        where: { id: id },
      });
      break;
    }

    case "searching": {
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
    }
    case "admin": {
      const { userId } = await auth();
      if (userId !== process.env.ADMIN_USER_ID) {
        return NextResponse.json("unidentified");
      }
      result = await db.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      break;
    }
    case "favorite": {
      const { userId } = await auth();
      const prodId = searchParams.get("id");
      if (!userId) {
        return NextResponse.json("Not user Id provided in api call");
      }
      if (!prodId) {
        return NextResponse.json("No item Id detected or existing in api Call");
      }
      const newResult = await db.favorite.findFirst({
        where: { productId: prodId, clerkId: userId },
      });

      return NextResponse.json(newResult);
    }
    case "allFavorite": {
      const { userId } = await auth();

      if (!userId) {
        return NextResponse.json("No user Id present on this page");
      }

      const favorites = await db.favorite.findMany({
        where: { clerkId: userId },
        include: {
          product: true,
        },
      });

      return NextResponse.json(favorites);
    }
    default: {
      result = await db.product.findMany();
      break;
    }
  }

  return NextResponse.json(result);
}

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string }>> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  let result: string = "Empty message";

  switch (type) {
    case "create": {
      try {
        ////Getting the ADMIN Id to check if we have the wrong user making requests
        const { userId } = await auth();
        if (!userId) {
          result = "Not allowed";
          redirect("/");
        }

        ////Formatting and Getting the key:data received in the request from the FormContainer
        const newData = await request.formData();
        const data = Object.fromEntries(newData);

        ////This is the part where we check the image File as being correct
        // ---- correct size and file type with imageSchema
        // ---- and upload it to the supabase Bucket
        const file = data.image as File;
        const validatedFile = validateWithZodSchema(imageSchema, {
          image: file,
        });
        const fullPath = await uploadImage(validatedFile.image);
        ////Special function that takes schema and the data to Validate and Create the error messages correctly
        const validateFields = validateWithZodSchema(productSchema, data);

        await db.product.create({
          data: {
            ...validateFields,
            image: fullPath,
            clerkId: userId,
          },
        });

        // await db.product.create({
        //   data: {
        //     name,
        //     company,
        //     description,
        //     price,
        //     image: "/images/jacket.png",
        //     featured,
        //     clerkId: userId,
        //   },
        // });
        result = "New Product Created";
      } catch (error: any) {
        result = error.message;
      }
    }

    case "delete": {
      try {
        const { userId } = await auth();
        if (!userId) {
          result = "Not allowed";
          redirect("/");
        }
        ////Simple deleting process , passing the {data: data} and not {headers: } required
        const product = await request.json();
        const productId = product.data;

        const deletedItems = await db.product.delete({
          where: { id: productId },
        });
        console.log(deletedItems);

        result = "Product Delete";
      } catch (error: any) {
        console.log(error);
        result = error.message;
      }
    }

    case "edit": {
      try {
        const { userId } = await auth();
        if (!userId) {
          result = "Not allowed";
          redirect("/");
        }
        //This way if you want to pass the data as { data: name, company, price , description , image}
        // const { data } = await request.json();
        // const { name, price, description, company, id } = data;

        //Post method using the Object form a form and extracting it
        const newData = await request.formData();
        const formData = Object.fromEntries(newData);
        console.log(formData);

        const validateData = validateWithZodSchema(productSchema, formData);

        if (!id) {
          result = "Not allowed";
          redirect("/");
        }
        await db.product.update({
          where: { id: id },
          data: {
            ...validateData,
          },
        });

        break;
      } catch (error: any) {
        console.log(error);
        result = error.message;
      }
    }

    case "updatedImage": {
      try {
        const { userId } = await auth();
        if (!userId) {
          result = "Not allowed";
          redirect("/");
        }

        if (!id) {
          result = "No Id Detected for Product";
          redirect("/");
        }

        const newData = await request.formData();
        const data = Object.fromEntries(newData);

        const imageUrl = data.url as string;
        const image = data.image as File;
        console.log(image);

        //Validate Image
        const validateFile = validateWithZodSchema(imageSchema, { image });

        const fullPath = await uploadImage(validateFile.image);

        await deleteImage(imageUrl);

        await db.product.update({
          where: {
            id: id,
          },
          data: {
            image: fullPath,
          },
        });
      } catch (error: any) {
        console.log(error);
        result = error.message;
      }
    }

    case "createFavorite": {
      try {
        const { userId } = await auth();
        const id = searchParams.get("id");

        if (!id) {
          result = "Not allowed";
          break;
        }

        if (!userId) {
          result = "Not allowed";
          redirect("/");
        }

        await db.favorite.create({
          data: {
            productId: id,
            clerkId: userId,
          },
        });
      } catch (error: any) {
        console.log(error);
        result = error.message;
      }
    }
    case "deleteFavorite": {
      try {
        const favoriteId = searchParams.get("id");
        console.log("Fav Id To Delete: ", favoriteId);

        if (!favoriteId) {
          break;
        }
        await db.favorite.delete({
          where: {
            id: favoriteId,
          },
        });
      } catch (error: any) {
        console.log(error);
        result = error.message;
      }
    }
  }
  return NextResponse.json({ message: result });
}
