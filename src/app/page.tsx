import Todo from "@/components/UI/todo";
import TodoFetcher from "@/components/UI/todo-fetcher";
import { getTodo, getTodos } from "@/lib/server/actions";
import Image from "next/image";
import React from "react";
import { dbTodo } from "../../types";

export default async function Home() {
  const todos = await getTodos();
  return (
    <main className="p-8 flex flex-col gap-4 h-full items-center justify-center flex-wrap">
      <TodoFetcher/>
      {todos?.map((t) => (
        <Todo key={t.id} todo={t} />
      ))}
    </main>
  );
}
