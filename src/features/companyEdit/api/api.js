import { supabase } from "@shared/api/supabaseClient";

export async function updateCompany(companyId, updates) {
    const { data, error } = await supabase
        .from('company')
        .update(updates)
        .eq('id', companyId)
        .select()
        .single();
    
    if (error) {
        console.error('Erro ao atualizar empresa:', error);
        throw new Error(
            error.message || 'Erro ao atualizar empresa. Tente novamente mais tarde.'
        );
    }
    return data;
}