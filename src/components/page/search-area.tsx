"use client";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchContext } from "../providers/search-provider";

function SearchArea() {
  const { query, setQuery } = useContext(SearchContext)!;
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const { replace } = useRouter();
  const [original, setOriginal] = useState<string>(query);
  const [debounce, setDebouncedQuery] = useState(original);
  const pathname = usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debounce !== original) params.delete("page");
      setDebouncedQuery(original);
    }, 500);
    return () => clearTimeout(handler);
  }, [debounce, original, params]);

  useEffect(() => {
    if (debounce) {
      setQuery(debounce);
      params.set("query", debounce);
    } else {
      setQuery("");
      params.delete("query");
    }
    
    //replace(`${pathname}${params && "?" + params.toString()}`);
    window.history.pushState(
      { path: `${pathname}${params && "?" + params.toString()}` },
      "",
      `${pathname}${params && "?" + params.toString()}`
    );
  }, [debounce, params, pathname, replace, setQuery]);

  function setSearch(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value as string;
    setOriginal(value);
  }

  return (
    <Input
      type="text"
      className="w-50"
      placeholder="Filter titles"
      color="transparent"
      value={original ?? ""}
      onChange={setSearch}
    />
  );
}

export default SearchArea;
