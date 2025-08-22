import CenterLayout from "@/components/page/center-layout";
import { notFound } from "next/navigation";
import React from "react";
type PageParams = { params: Promise<{ id: string }> };
export default async function Page({ params }: PageParams) {
  const { id } = await params;
  const idVal = Number(id);
  if (isNaN(idVal)) {
    notFound();
  }

  return (
    <CenterLayout>
      <div></div>
    </CenterLayout>
  );
}
