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
import Link from "next/link";

interface TodoProps {
  todo?: dbTodo;
  promise?: Promise<dbTodo>;
}

export default function Todo({ todo, promise }: TodoProps) {
  let data = todo ? todo : promise ? use(promise) : undefined;

  if (!data) return <div>Not found</div>;

  const { id, alarmDate, description, value: title } = data;

  const alarmIsSet = alarmDate !== null && alarmDate > 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {alarmIsSet && <CardDescription>Hi</CardDescription>}
        <CardAction>
          <Button asChild>
            <Link href={`/todos/${id}`}>Edit</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
