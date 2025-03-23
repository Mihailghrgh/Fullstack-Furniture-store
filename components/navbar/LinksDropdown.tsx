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
// import { UserIcon } from "lucide-react";
import { SignedOut } from "@clerk/nextjs";
import { SignedIn, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import SignOutLink from "./SignOutLink";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w=[100px]">
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
            return (
              <Link href={item.href} key={item.href}>
                <DropdownMenuItem className="capitalize">
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink/>
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
