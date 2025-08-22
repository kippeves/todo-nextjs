import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import type { ReactElement } from "react";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ pages: string[] }>;
}) {
  const data = await params;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;
  for (let i = 0; i < data.pages.length; i++) {
    const route = data.pages[i];
    const href = i > 0 ? `/${data.pages.at(0)}/${route}` : `${route}`;
    if (i === data.pages.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="capitalize" href={`/${href}`}>
                {route}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
