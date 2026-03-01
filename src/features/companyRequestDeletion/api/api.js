import { supabase } from '@shared/api/supabaseClient';

export async function requestCompanyDeletion(companyId) {
    const { error } = await supabase
        .from('company')
        .update({ status: 'pending_deletion' })
        .eq('id', companyId);
    
    if (error) throw new Error(error.message);
    return true;
}