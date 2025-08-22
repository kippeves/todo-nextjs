"use client";
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type Context = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};
export const SearchContext = createContext<Context | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
