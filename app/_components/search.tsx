"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const router = useRouter();

  function onSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const elements = e.currentTarget.elements as typeof form.elements & {
      search: { value: string };
    };
    const searchValue = elements.search.value;

    if (!searchValue) return;

    router.push(`/restaurants?name=${searchValue}`);
  }

  return (
    <form className="flex gap-2" onSubmit={onSearch}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        name="search"
      />

      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
