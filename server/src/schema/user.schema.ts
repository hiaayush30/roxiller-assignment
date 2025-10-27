import z from "zod";

export const registerUserSchema = z.object({
    email: z.email(),
    password: z.string().min(5, { error: "password must atleast have 5 characters" })
})

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string()
})