import { supabase } from "@shared/api/supabaseClient";

export async function deleteNote(noteId) {
    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

    if (error) throw new Error("Erro ao deletar nota:", error.message);
    return true;
}