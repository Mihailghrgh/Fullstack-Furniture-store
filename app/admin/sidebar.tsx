"use client";
import { adminLink } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Sidebar() {
  const pathName = usePathname();
  return (
    <aside>
      {adminLink.map((item) => {
        const isActive = pathName === item.href;
        const variant = isActive ? "outline" : "ghost";

        return (
          <Button
            asChild
            className="w-full mb-2 capitalize font-normal justify-start"
            variant={variant}
            key={item.label}
          >
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default Sidebar;
