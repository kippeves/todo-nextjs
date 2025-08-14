import { todos } from "@/lib/server/db/schema";

type dbTodo = typeof todos.$inferSelect;

type API<T> = {
    success: {
        data: T
    },
    loading: {
        done: boolean
    },
    error: {
        error: string | string[]
    }
}
type Fetch<T> =  {
    [K in keyof API<T>]: {
        type: K
    } & API<T>[K]
}