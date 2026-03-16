import { noteSchema } from "@entities/note/model/schema";

export const createNoteSchema = noteSchema.omit({
    id: true,
    created_at: true,
});