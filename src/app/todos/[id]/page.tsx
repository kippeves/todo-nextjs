import CenterLayout from "@/components/page/center-layout";
import { TodoForm } from "@/components/page/todo-form";
import { getTodo } from "@/lib/server/actions";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
type PageParams = { params: Promise<{ id: string }> };
export default async function Page({ params }: PageParams) {
  const { id } = await params;
  const idVal = Number(id);
  if (isNaN(idVal)) {
    notFound();
  }
  const data = await getTodo(idVal);
  if(!data)
    notFound();
  return (
    data && (
      <CenterLayout>
        <TodoForm data={data} />
      </CenterLayout>
    )
  );
}
