"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import axios from "axios";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  // const submitRequest = async() => {
  //     axios.post('/api/products')
  //     console.log('Search');
  // }

  return (
    <div>
      <Button
        type="submit"
        disabled={pending}
        className={cn("capitalize", className)}
        size={size}
        // onSubmit={submitRequest}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
            Please wait...
          </>
        ) : (
          text
        )}
      </Button>
    </div>
  );
}
export default SubmitButton;
