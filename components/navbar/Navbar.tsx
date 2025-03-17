import Container from "../global/Container";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col justify-between sm:flex-row flex-wrap py-8 gap-4">
        <Logo />
        <NavSearch />
        <div className="flex justify-center gap-24 md:gap-8">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
