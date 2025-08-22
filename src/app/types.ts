import { z } from 'zod'

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}

export const Todo = z.object({
    id: z.number().positive(),
    title: z.string(),
    alarm: z.number(),
    description: z.string(),
    finished: z.number(),
    priority: z.number()
})

export const Todos = z.array(Todo);

export type Todo = z.infer<typeof Todo>;

export type API<T> = {
    success: {
        data: T,
        _total: number,
        _pages: number
    },
    loading: {
        done: boolean
    },
    error: {
        error: Error | string | string[]
        code?: number
    }
}
export type FetchResult<T> = {
    [K in keyof API<T>]: Prettify<{
        type: K
    } & API<T>[K]>
}[keyof API<T>]