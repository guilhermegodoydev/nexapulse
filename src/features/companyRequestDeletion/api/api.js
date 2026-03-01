import { supabase } from '@shared/api/supabaseClient';

export async function requestCompanyDeletion(companyId) {
    const { error } = await supabase
        .from('company')
        .update({ pending_delete: true })
        .eq('id', companyId);
    
    if (error) {
        console.error('Erro ao solicitar deleção da empresa:', error);
        throw new Error(
            error.message || 'Erro ao solicitar exclusão da empresa. Tente novamente mais tarde.'
        );
    }
    return true;
}