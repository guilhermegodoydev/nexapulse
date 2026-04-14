import { z } from 'zod'

export const authByEmailSchema = z.object({
    email: z.email({ message: "Email inválido" }).trim().min(2, "O email é obrigatório").max(100, "O email é longo demais"),
    password: z.string().trim().min(8, { message: "A senha deve conter pelo menos 8 caracteres" }).max(64, "A senha é longa demais")
});