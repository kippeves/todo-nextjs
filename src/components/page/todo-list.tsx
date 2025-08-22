"use client";
import { useContext, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FetchResult, Todo } from "@/app/types";
import { SearchContext } from "../providers/search-provider";
import { getTodos, searchTodos } from "@/app/lib/server/actions";
import { usePathname, useSearchParams } from "next/navigation";

export default function TodoList() {
  const { query, page } = useContext(SearchContext)!;
  const [result, setResult] = useState<FetchResult<Todo[]>>();

  useEffect(() => {
    const search = async (query: string) => {
      const task = !query.length
        ? getTodos(page)
        : page
        ? searchTodos({ term: query, page: page.toString() })
        : searchTodos({ term: query });
      await task.then(setResult);
    };

    search(query ?? "");
  }, [page, query]);

  const pageIndex = (page ?? 1) - 1;

  return (
    result &&
    result.type === "success" && (
      <div className="flex flex-col w-7xl gap-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Alarm</TableHead>
              <TableHead>Finished</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{pageIndex * 20 + (index + 1)}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  {item.alarm
                    ? new Date(item.alarm).toDateString()
                    : "None set"}
                </TableCell>
                <TableCell>
                  {item.finished
                    ? new Date(item.finished).toDateString()
                    : "Not yet."}
                </TableCell>
                <TableCell>{item.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationList pages={result._pages} />
      </div>
    )
  );
}

function PaginationList({ pages }: { pages: number }) {
  const { page, setPage } = useContext(SearchContext)!;
  const currentParams = useSearchParams();
  const path = usePathname();
  const params = new URLSearchParams(currentParams);

  const currentPage = page ?? 1;
  const setState = () =>
    window.history.replaceState({ path }, "", `${path}?${params}`);
  const getPrev = async () => {
    params.set("page", (currentPage - 1).toString());
    setPage(currentPage - 1);
    setState();
    //return `${path}?${params}`;
  };

  const getLink = async (page: number) => {
    params.set("page", page.toString());
    setPage(page);
    setState();
  };

  const getNext = async () => {
    params.set("page", (currentPage + 1).toString());
    setPage(currentPage + 1);
    setState();
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={getPrev} />
          </PaginationItem>
        )}
        {Array.from({ length: pages }).map((_, i) => {
          const index = i + 1;
          if (index <= currentPage + 3 && index >= currentPage - 3) {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i === currentPage - 1}
                  onClick={() => getLink(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        {currentPage !== pages && (
          <PaginationItem>
            <PaginationNext onClick={getNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
