"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/type";
import axios from "axios";

const initialState = {
  message: "",
};

function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const response = await axios.post("/api/products" , formData);

        return { message: response.data.message };
      } catch (error: any) {
        return {
          message:
            error.response?.data?.message ||
            "Error creating request to server ",
        };
      }
    },
    { message: "Sending Request" }
  );
  const { toast } = useToast();
  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
