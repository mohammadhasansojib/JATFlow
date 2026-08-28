import * as z from "zod"

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "password must be minimum 8 characters"),
});

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "password must be minimum 8 characters"),
})