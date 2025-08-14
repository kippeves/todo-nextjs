import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { getTodo } from "@/lib/server/actions";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idVal = Number(id);
  if (isNaN(idVal)) {
    return <></>;
  }
  // Fetch our cat information from the database
  const todo = await getTodo(idVal);
  if (!todo) return <>Not Found</>;

  const links = [
    {
      href: "/",
      title: "Home",
    },
    { href: "/todos", title: "Todos" },
  ];
  return (
    <BreadcrumbList>
      {links.map((link, i) => {
        return (
          <Fragment key={i}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        );
      })}
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{todo.value}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
