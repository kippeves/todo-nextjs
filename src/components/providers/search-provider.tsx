"use client";
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type Context = {
  query?: string;
  setQuery: Dispatch<SetStateAction<string | undefined>>;
  page?: number;
  setPage: Dispatch<SetStateAction<number | undefined>>;
};
export const SearchContext = createContext<Context | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? undefined);
  const [page, setPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : undefined
  );

  return (
    <SearchContext.Provider value={{ query, setQuery, page, setPage }}>
      {children}
    </SearchContext.Provider>
  );
}
