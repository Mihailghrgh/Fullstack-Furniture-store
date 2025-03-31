"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function FormContainer({ children }: { children: React.ReactNode }) {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const response = await axios.post("/api/products", formData);

        return { message: response.data.message };
      } catch (error: any) {
        return {
          message:
            error.response?.data?.message ||
            "Error creating request to server ",
        };
      }
    },
    { message: "" }
  );
  const { toast } = useToast();
  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state]);

  const handleSubmit = () => {
    toast({ description: "Form Submitted" });
  };
  return (
    <form action={formAction} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
export default FormContainer;
