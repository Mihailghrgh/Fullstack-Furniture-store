"use client";
import Link from "next/link";
import Image from "next/image";
import logo2 from "@/public/logo2.png";
import logo3 from "@/public/logo3.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Link href="/">
      <Image
        key={currentTheme} 
        src={currentTheme === "dark" ? logo3 : logo2}
        alt="logo"
        priority
        className="flex items-center justify-center h-20 w-60 object-contain"
      />
    </Link>
  );
}

export default Logo;
