import { db } from "@/lib/server/db";
import { todos } from "@/lib/server/db/schema";
import { createInsertSchema } from "drizzle-zod";

export async function GET() {
  // For example, fetch data from your DB here
  const todoRequest = await db.select().from(todos);
  return new Response(JSON.stringify({ todos: todoRequest }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const insertObject = await request.json();
  const todoValidator = createInsertSchema(todos);
  const insert = await todoValidator.safeParseAsync(insertObject);
  if (!insert.success)
    return new Response(JSON.stringify({ error: insert.error.issues }));

  const insertRequest = await db.insert(todos).values(insert.data).returning();
  const insertedItem = insertRequest[0];
  if (!insertedItem) return new Response(null, { status: 204 });
  return new Response(JSON.stringify({ item: insertedItem }));
}
