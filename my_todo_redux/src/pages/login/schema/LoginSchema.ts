import { z } from "zod";

// Zod schema for validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type for form data
export type LoginFormInputs = z.infer<typeof loginSchema>;
