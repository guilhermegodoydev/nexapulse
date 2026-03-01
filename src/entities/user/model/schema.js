import { z } from 'zod'

export const authByEmailSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
});