import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links } from "@/utils/links";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w=[100px]">
          <LuAlignLeft className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-5" align="center">
        {links.map((item) => {
          return (
            <DropdownMenuItem key={item.href}>
              <Link href={item.href} className="capitalize ">
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
