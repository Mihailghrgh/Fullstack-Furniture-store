"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: "Logout Successful!" });
  };
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left " onClick={handleLogout}>
        Logout
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
