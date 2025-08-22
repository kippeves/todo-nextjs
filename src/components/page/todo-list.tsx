"use client";
import { useContext, useEffect, useMemo, useState } from "react";
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
  const { query } = useContext(SearchContext)!;
  const [result, setResult] = useState<FetchResult<Todo[]>>();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const page = params.get("page");

  useEffect(() => {
    const search = async (query: string) => {
      const task =
        query.length > 0
          ? page
            ? searchTodos({ term: query, page: page })
            : searchTodos({ term: query })
          : getTodos();
      await task.then((e) => {
        console.dir(e);
        setResult(e);
      });
    };

    search(query);
  }, [page, query]);

  return (
    result &&
    result.type === "success" && (
      <>
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
                <TableCell>{(Number(page) - 1) * 20 + index + 1}</TableCell>
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
      </>
    )
  );
}

function PaginationList({ pages }: { pages: number }) {
  const currentParams = useSearchParams();
  const path = usePathname();
  const params = new URLSearchParams(currentParams);
  const currentPage = currentParams.get("page")
    ? Number(currentParams.get("page"))
    : 1;

  const getPrev = () => {
    params.set("page", (currentPage - 1).toString());
    return `${path}?${params}`;
  };

  const getLink = (page: number) => {
    params.set("page", page.toString());
    return `${path}?${params}`;
  };

  const getNext = () => {
    params.set("page", (currentPage + 1).toString());
    return `${path}?${params}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPrev()} />
          </PaginationItem>
        )}
        {Array.from({ length: pages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage - 1}
              href={getLink(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== pages && (
          <PaginationItem>
            <PaginationNext href={getNext()} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
