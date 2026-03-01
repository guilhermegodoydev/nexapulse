import { supabase } from "@shared/api/supabaseClient";

export async function updateCompany(companyId, updates) {
    const { data, error } = await supabase
        .from('company')
        .update(updates)
        .eq('id', companyId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return data;
}