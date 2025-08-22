"use server"

import { FetchResult, Todo, Todos } from "@/app/types";

export async function HandleFetch<T>(uri: string, params?: { [key: string]: string }) {

    type result = FetchResult<T>;
    const limit = params?.limit ? Number(params.limit) : 20;
    const newParams = new URLSearchParams();
    if (params) {
        if (params.page)
            newParams.set("_page", params.page);
        if (params.term)
            newParams.set("q", params.term)
    }
    newParams.set("_limit", limit.toString())

    const finalURI = params ? `${uri}?${newParams.toString()}` : uri;

    return await fetch(finalURI).then(async (res) => {
        if (res.status !== 200)
            return { type: "error", code: res.status } as result
        const totalString = res.headers.get('X-Total-Count')
        const total = totalString && Number(totalString);
        const value = await res.json();
        const parse = await Todos.safeParseAsync(value);
        return parse.success ?
            { type: "success", data: parse.data, _total: total, _pages: total && Math.ceil(total / limit) } as result :
            { type: "error", error: parse.error.message } as result
    }).catch(e => {
        return (
            (e instanceof Error) ?
                { type: "error", error: e } :
                { type: "error", error: "Error" }
        ) as result;
    })

}

const baseURI = 'http://localhost:4500/todos';

export const searchTodos = async (params: { term: string, page?: string }) => await HandleFetch<Todo[]>(baseURI, params)
export const getTodos = async (page = 1) => await HandleFetch<Todo[]>(baseURI, { take: "20", page: page.toString() })
