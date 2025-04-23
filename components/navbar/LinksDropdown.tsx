import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";
import UserIcon from "./UserIcon";
import { SignedOut } from "@clerk/nextjs";
import { SignedIn, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import SignOutLink from "./SignOutLink";

function LinksDropdown({ isAdmin }: { isAdmin: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px] bg-secondary">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="center">
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              {<button className="w-full text-left">Login</button>}
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              {<button className="w-full text-left">Register</button>}
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((item) => {
            if (item.label === "dashboard" && !isAdmin) {
              return null;
            }
            return (
              <Link href={item.href} key={item.href}>
                <DropdownMenuItem className="capitalize focus:bg-muted hover:cursor-pointer ">
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-secondary">
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
