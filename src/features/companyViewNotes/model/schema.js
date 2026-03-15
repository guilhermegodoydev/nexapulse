import { noteSchema } from "@entities/note/model/schema";

export const noteViewSchema = noteSchema.omit({
    company_id: true,
}).transform((note) => ({
    id : note.id,
    title: note.title,
    description: note.description,
    createdAt: new Date(note.created_at).toLocaleDateString()
}));