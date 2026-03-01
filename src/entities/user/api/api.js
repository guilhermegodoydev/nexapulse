import { supabase } from "@shared/api/supabaseClient.js";

export async function loginWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data.user;
}