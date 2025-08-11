import React from "react";
import { dbTodo } from "../../../types";

const todo = ({ todo }: { todo: dbTodo }) => {
  return (
    <div className="w-lg text-center border border-white rounded-xl p-4">
      <h1>{todo.value}</h1>
      <div>{todo.description}</div>
    </div>
  );
};

export default todo;
