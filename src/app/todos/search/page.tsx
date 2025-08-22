import CenterLayout from "@/components/page/center-layout";
import TodoList from "@/components/page/todo-list";
import React from "react";

export default async function Page() {
  return (
    <CenterLayout>
      <TodoList />
    </CenterLayout>
  );
}
