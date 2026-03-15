import { z } from 'zod'

export const authByEmailSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string(),
});