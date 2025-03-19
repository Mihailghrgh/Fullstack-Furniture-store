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
            <Link href={item.href} key={item.href}>
              <DropdownMenuItem className="capitalize">
                {item.label}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
