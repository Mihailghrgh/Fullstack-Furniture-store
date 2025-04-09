"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { SquarePen } from "lucide-react";
import { useTheme } from "next-themes";

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

type actionType = "edit" | "delete";

export const IconButton = ({
  actionType,
  productId,
}: {
  actionType: actionType;
  productId: string;
}) => {
  const { pending } = useFormStatus();
  const { theme, resolvedTheme } = useTheme();


  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return (
          <SquarePen
            className={
              resolvedTheme === "light" ? "text-blue-600" : "text-yellow-400"
            }
          />
        );

      case "delete":
        return (
          <LuTrash2
            className={
              resolvedTheme === "light" ? "text-blue-600" : "text-yellow-400"
            }
          />
        );
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
          Please wait...
        </>
      ) : (
        renderIcon()
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({
  isFavorite,
  handleToggle,
}: {
  isFavorite: boolean;
  handleToggle: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
      onClick={handleToggle}
    >
      {pending ? (
        <Loader2 className="animate-spin"></Loader2>
      ) : isFavorite === true ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};
