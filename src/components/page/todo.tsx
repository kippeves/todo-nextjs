"use client";
import React, { use } from "react";
import { dbTodo } from "../../../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

interface TodoProps {
  todo?: dbTodo;
  promise?: Promise<dbTodo>;
}

export default function Todo({ todo, promise }: TodoProps) {
  
  let data = todo ? todo : promise ? use(promise) : undefined;

  if (!data) return <div>Not found</div>;

  const { alarmDate, description, value: title } = data;

  const alarmIsSet = alarmDate !== null && alarmDate > 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {alarmIsSet && <CardDescription>Hi</CardDescription>}
        <CardAction>
          <Button>Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant={"outline"} className="w-full">
          Button
        </Button>
      </CardFooter>
    </Card>
  );
}
