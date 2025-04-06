"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function FormContainer({
  children,
  type,
  productId,
  favoriteId,
}: {
  children: React.ReactNode;
  type: string;
  productId?: string;
  favoriteId?: string | null;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const response = await axios.post(
          `/api/products?type=${type}${productId && `&id=${productId}`}${
            favoriteId === null
              ? `&favoriteId=notFavorite`
              : `&favoriteId=${favoriteId}`
          }`,
          formData
        );

        return { success: true, response: response.data.message };
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
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success]);

  const handleSubmit = async () => {
    toast({
      className:
        "fixed top-5 left-1/2 transform -translate-x-1/2 w-80 shadow-lg bg-primary-foreground",
      description: "Form Submitted",
    });
  };
  return (
    <form action={formAction} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
export default FormContainer;
