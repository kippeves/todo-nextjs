"use server";
import { cache } from "react";
import { db } from "@/lib/server/db";
import { eq } from "drizzle-orm";
import { todos } from "./db/schema";
import { dbTodo } from "../../../types";

export const getTodos = cache(async () => await db.select().from(todos));

export const getTodo = async (id: number) => {
  const cacheItem = cache(
    async (searchId: number) =>
      await db.query.todos.findFirst({
        where: eq(todos.id, searchId),
      })
  );
  return cacheItem(id) as Promise<dbTodo>;
};
