"use client";
import React, { Suspense, useState } from "react";
import { dbTodo } from "../../../types";
import { getTodo } from "@/lib/server/actions";
import Todo from "./todo";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function TodoFetcher() {
  const [fetchId, setFetchId] = useState(0);
  const [promise, setPromise] = useState<Promise<dbTodo>>();
  async function serverFetch(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setPromise(getTodo(fetchId));
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Get One</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              type="number"
              placeholder="ID"
              value={fetchId}
              onChange={(e) =>
                e.target.value && setFetchId(Number(e.target.value))
              }
            />
            <Button
              type="button"
              variant="outline"
              onClick={(e) => serverFetch(e)}
            >
              Load
            </Button>
          </div>
        </CardContent>
      </Card>
      {promise && (
        <Suspense fallback={<div>Loading...</div>}>
          <Todo promise={promise} />
        </Suspense>
      )}
    </>
  );
}
