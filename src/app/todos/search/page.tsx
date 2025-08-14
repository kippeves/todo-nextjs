import TodoFetcher from "@/components/page/todo-fetcher";
import React from "react";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <TodoFetcher />
    </div>
  );
}
