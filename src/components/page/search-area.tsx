"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchArea() {
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [debounce, setDebouncedQuery] = useState(query);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debounce !== query) params.delete("page");

      setDebouncedQuery(query);
    }, 250);
    return () => clearTimeout(handler);
  }, [debounce, params, query]);

  useEffect(() => {
    if (debounce) {
      params.set("query", debounce);
    } else params.delete("query");
    replace(`${pathname}${params && "?" + params.toString()}`);
  }, [debounce, params, pathname, replace]);

  function setSearch(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value as string;
    setQuery(value);
  }

  return (
    <Input
      type="text"
      className="w-50"
      placeholder="Filter titles"
      color="transparent"
      value={query}
      onChange={setSearch}
    />
  );
}

export default SearchArea;
