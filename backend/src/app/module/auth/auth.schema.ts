import * as z from "zod"

export const RegisterSchema = z.object({
    username: z.string().min(3, "username must be minimum 3 character").max(20, "username must be maximum 20 characters"),
    email: z.email(),
    password: z.string().min(8, "password must be minimum 8 characters"),
});

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "password must be minimum 8 characters"),
})