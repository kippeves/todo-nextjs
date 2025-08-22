"use server";
import CenterLayout from "@/components/page/center-layout";
import TodoList from "@/components/page/todo-list";
import { Suspense } from "react";

export default async function Page() {
  return (
    <CenterLayout>
      <Suspense fallback={<div>Laddar...</div>}>
        <TodoList />
      </Suspense>
    </CenterLayout>
  );
}
