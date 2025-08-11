import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const dev = process.env.NODE_ENV ? "development" : "production";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!dev && !process.env.DATABASE_AUTH_TOKEN)
  throw new Error("DATABASE_AUTH_TOKEN is not set");

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
