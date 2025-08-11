import { eq } from "drizzle-orm";
import { db } from "@/lib/server/db";
import { todos } from "@/lib/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id: requestId } = await params;

  // For example, fetch data from your DB here
  const todoRequest = await db
    .select()
    .from(todos)
    .where(eq(todos.id, requestId));

  return todoRequest.length > 0
    ? new Response(JSON.stringify({ todos: todoRequest }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    : new Response(null, { status: 204 });
}
