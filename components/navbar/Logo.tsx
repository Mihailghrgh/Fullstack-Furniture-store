import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import logo2 from "@/public/logo2.png";
import logo3 from "@/public/logo3.png";
import { useTheme } from "next-themes";

function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/">
      <Image
        src={theme === "light" ? logo2 : theme === "dark" ? logo3 : logo2}
        sizes=""
        className="flex items-center justify-center h-20 w-60 object-contain"
        priority
        alt="logo"
      />
    </Link>
  );
}
export default Logo;
