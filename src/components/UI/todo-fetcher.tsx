"use client";
import React from "react";
import { dbTodo } from "../../../types";
import { getTodo } from "@/lib/server/actions";
import Todo from "./todo";

const TodoFetcher = () => {
  const [fetchId, setFetchId] = React.useState(0);
  const [searchedTodo, setSearchedTodo] = React.useState<dbTodo>();

  async function serverFetch(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const returnValue = await getTodo(fetchId);
    setSearchedTodo(returnValue);
  }

  return (
    <>
      <fieldset className="flex flex-row gap-4 items-center">
        <label htmlFor="selectId">Select the todo to fetch</label>
        <input
          className="border border-white p-2 rounded"
          type="number"
          name="selectId"
          id="selectId"
          value={fetchId}
          onChange={(e) => setFetchId(Number(e.target.value))}
        />
        <button type="button" onClick={(e) => serverFetch(e)}>
          Get ToDo
        </button>
      </fieldset>
      {searchedTodo && <Todo todo={searchedTodo} />}
    </>
  );
};

export default TodoFetcher;
