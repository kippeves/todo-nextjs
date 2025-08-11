import { todos } from "@/lib/server/db/schema";

type dbTodo = typeof todos.$inferSelect;