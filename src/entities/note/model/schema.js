import { z } from "zod";

export const noteSchema = z.object({
    id: z.uuid(),
    title: z.string().min(1, "Título é obrigatório").max(50, "Título muito longo"),
    description: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
    created_at: z.string(),
    company_id: z.uuid(),
});

export const noteViewSchema = noteSchema.omit({
    company_id: true,
}).transform((note) => ({
    id : note.id,
    title: note.title,
    description: note.description,
    createdAt: new Date(note.created_at).toLocaleDateString()
}));