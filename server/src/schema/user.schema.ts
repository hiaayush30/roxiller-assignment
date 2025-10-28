import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Name cannot be empty."),
  email: z.email("Invalid email format."),
  address: z.string().min(5, "Address is too short."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});


export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(1, "Password cannot be empty."),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;