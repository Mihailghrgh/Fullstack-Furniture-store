"use client";

import Container from "../global/Container";
import Logo from "./Logo";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Navbar() {
  const fetchActiveUser = async () => {
    try {
      const { data } = await axios.get("/api/products?type=isAdmin");
      return data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchActiveUser,
    staleTime: 10000 * 60,
  });

  return (
    <nav className="border-b-4">
      <Container className="pb-5 lg:pb-0 flex flex-col justify-between items-center sm:flex-row flex-wrap gap-6">
        <Logo />

        <div className="flex items-center justify-center gap-10 md:gap-8">
          <CartButton />
          <DarkMode />
          <LinksDropdown isAdmin={data} />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
