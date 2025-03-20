import { Input } from "../ui/input";

function NavSearch() {
  return (
    <div className="w-full md:w-60">
      <Input
        name=""
        type="search"
        placeholder="search product..."
        className="py-4 max-w-4xl w-full md:w-full dark:bg-muted flex justify-center"
      ></Input>
    </div>
  );
}
export default NavSearch;
