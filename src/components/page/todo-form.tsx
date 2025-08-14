"use client";

import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const todoSchema = z.object({
  value: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  finished: z.number().int().min(0).max(1),
  alarmDate: z.number().int().min(0),
  priority: z.number().int().min(0).max(3),
});

type TodoFormData = z.infer<typeof todoSchema>;

export function TodoForm() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      value: "",
      description: "",
      finished: 0,
      alarmDate: 0,
      priority: 0,
    },
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      // Here you would typically send the data to your backend/database
      console.log("Todo data:", data);

      toast.success("Success", {
        description: "Todo has been added successfully.",
      });

      // Reset form
      reset();
    } catch (error) {
      toast.warning("Error", {
        description: "Failed to add todo. Please try again.",
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    // Convert date string to timestamp (seconds since epoch)
    const timestamp = dateValue
      ? Math.floor(new Date(dateValue).getTime() / 1000)
      : 0;
    setValue("alarmDate", timestamp);
  };

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title/Value Field */}
          <div className="space-y-2">
            <Label htmlFor="value">Title *</Label>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="value"
                  type="text"
                  placeholder="Enter todo title"
                  className={errors.value ? "border-red-500" : ""}
                />
              )}
            />
            {errors.value && (
              <p className="text-sm text-red-500">{errors.value.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter todo description"
                  rows={3}
                  className={errors.description ? "border-red-500" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority Field */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) =>
                    field.onChange(Number.parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Low</SelectItem>
                    <SelectItem value="1">Medium</SelectItem>
                    <SelectItem value="2">High</SelectItem>
                    <SelectItem value="3">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Alarm Date Field */}
          <div className="space-y-2">
            <Label htmlFor="alarmDate">Alarm Date & Time</Label>
            <Input
              id="alarmDate"
              type="date"
              min={getCurrentDateTimeLocal()}
              onChange={handleDateChange}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Leave empty for no alarm
            </p>
          </div>

          {/* Finished Checkbox */}
          <div className="flex items-center space-x-2">
            <Controller
              name="finished"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="finished"
                  checked={field.value === 1}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                />
              )}
            />
            <Label htmlFor="finished">Mark as completed</Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Todo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
