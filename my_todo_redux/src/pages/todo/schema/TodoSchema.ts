import { z } from "zod";

// Zod schema for validation
export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dateTime: z.string().min(1, "Date Time is required"),
  priority: z.string().min(1, "Priority is required"),
});

// TypeScript type for form data
export type TodoFormInputs = z.infer<typeof todoSchema>;