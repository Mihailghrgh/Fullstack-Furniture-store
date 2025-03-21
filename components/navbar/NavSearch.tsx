"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import axios from "axios";

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`/products?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }

    const handleNewProducts = async () => {
      const searchQuery = searchParams.get("search");
      const layout = searchParams.get("layout");
      const url = `/api/products?type=searched&search=${searchQuery}&layout=${layout}`;
      const data = await axios.get(url);
      console.log(data);
      
    };

    handleNewProducts();
  }, [searchParams.get("search")]);

  return (
    <div className="w-full md:w-60">
      <Input
        name=""
        type="search"
        placeholder="search product..."
        className="py-4 max-w-4xl w-full md:w-full dark:bg-muted flex justify-center"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
export default NavSearch;
