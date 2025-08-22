import CenterLayout from "@/components/page/center-layout";
import { getTodos } from "../lib/server/actions";
import TodoList from "@/components/page/todo-list";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <CenterLayout>
      <div className="container">
        <Suspense key={query + currentPage} fallback={<div>Laddar...</div>}>
          <TodoList query={query} page={currentPage} />
        </Suspense>
      </div>
    </CenterLayout>
  );
}
