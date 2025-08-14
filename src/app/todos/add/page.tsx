import CenterLayout from "@/components/page/center-layout";
import { TodoForm } from "@/components/page/todo-form";
import React from "react";

export default async function Page() {
  return (
    <CenterLayout>
      <TodoForm />
    </CenterLayout>
  );
}
