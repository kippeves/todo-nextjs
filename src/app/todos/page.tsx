import Todo from "@/components/page/todo";
import TodoFetcher from "@/components/page/todo-fetcher";
import { getTodos } from "@/lib/server/actions";
import React from "react";

export default async function Page() {
  const todos = await getTodos();
  return (
    <>
      <h2 className="text-lg font-bold">All Todos</h2>
      <div className="gap-4 columns-2">
        {todos?.map((t) => (
          <Todo key={t.id} todo={t} />
        ))}
      </div>
    </>
  );
}
