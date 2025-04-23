"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCart } from "@/utils/numItemsInCart";

function FormContainer({
  children,
  type,
  productId,
  favoriteId,
  handleRefetch,
  refetchCartData,
  apiRoute = "products",
}: {
  children: React.ReactNode;
  type: string;
  productId?: string;
  favoriteId?: string | null;
  handleRefetch?: () => void;
  refetchCartData?: () => void;
  apiRoute?: string;
}) {
  const router = useRouter();
  const { fetchCartNumber } = useCart();
  const { toast } = useToast();

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const response = await axios.post(
          `/api/${apiRoute}?type=${type}${productId && `&id=${productId}`}${
            favoriteId && `&favoriteId=${favoriteId}`
          }`,
          formData
        );

        if (type === "createReview" && handleRefetch) {
          handleRefetch();
        }

        if (type === "removeCartItemAction" && refetchCartData) {
          refetchCartData();
        }
        fetchCartNumber();

        toast({
          className:
            "fixed top-5 bg-red-500 left-1/2 transform -translate-x-1/2 w-80 shadow-lg bg-primary-foreground",
          style: { whiteSpace: "pre-line" },
          description: response.data.message,
        });
        return {
          success: true,
          response: response.data.message,
        };
      } catch (error: any) {
        return {
          message:
            error.response?.data?.message ||
            "Error creating request to server ",
        };
      }
    },
    { message: "Sent" }
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success]);

  // const handleSubmit = async () => {
  //   toast({
  //     className:
  //       "fixed top-5 bg-red-500 left-1/2 transform -translate-x-1/2 w-80 shadow-lg bg-primary-foreground",
  //     description: state.response,
  //   });
  // };
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
