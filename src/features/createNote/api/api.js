import { supabase } from "@shared/api/supabaseClient";

export async function createNote(note) {
    const { data, error } = await supabase
        .from("notes")
        .insert([note])
        .select()
        .single()
    
    if (error) throw new Error(error.message);
    return data;
}