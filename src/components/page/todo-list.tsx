"use server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getTodos, searchTodos } from "@/app/lib/server/actions";

export default async function TodoList({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const request = query
    ? await searchTodos(
        page ? { term: query, page: page.toString() } : { term: query }
      )
    : await getTodos(page);
  const data = request.type === "success" ? request.data : undefined;

  return (
    data && (
      <Table>
        <TableCaption>Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Alarm</TableHead>
            <TableHead>Finished</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {item.alarm ? new Date(item.alarm).toDateString() : "None set"}
              </TableCell>
              <TableCell>
                {item.finished
                  ? new Date(item.finished).toDateString()
                  : "Not yet."}
              </TableCell>
              <TableCell>{item.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
