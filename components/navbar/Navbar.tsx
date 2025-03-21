"use client";

import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Suspense } from "react";

function Navbar() {
  return (
    <nav className="border-b-4">
      <Container className="pb-5 lg:pb-0 flex flex-col justify-between items-center sm:flex-row flex-wrap gap-6">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="flex items-center justify-center gap-24 md:gap-8">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
