"use server";
import CenterLayout from "@/components/page/center-layout";
import TodoList from "@/components/page/todo-list";
import { Suspense } from "react";
import { getTodos, searchTodos } from "../lib/server/actions";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  return (
    <CenterLayout>
      <div className="container">
        <Suspense fallback={<div>Laddar...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </CenterLayout>
  );
}
