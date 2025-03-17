import { Input } from "../ui/input";

function NavSearch() {
  return (
    <div>
      <Input
        name=""
        type="search"
        placeholder="search product..."
        className="max-w-xl w-full md:w-full dark:bg-muted flex justify-center"
      ></Input>
    </div>
  );
}
export default NavSearch;
