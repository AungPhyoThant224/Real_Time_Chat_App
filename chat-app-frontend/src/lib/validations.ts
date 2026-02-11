import {z} from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string(),
  role: z.enum(["USER", "ADMIN"], "Please select a role."),
  
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;