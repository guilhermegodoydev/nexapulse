import { supabase } from '@shared/api/supabaseClient';

export async function deleteCompany(companyId) {
    const { error } = await supabase
    .from('company')    
    .delete()
    .eq('id', companyId);

    if (error) throw new Error(error.message);
    return true;
}