import { supabase } from '@shared/api/supabaseClient';

export async function getCompaniesSummary() {
    const { data, error } = await supabase
        .from('company')
        .select('id, trade_name, status, annual_revenue, company_contact( name, last_contact )')
        .eq('company_contact.is_main_contact', true)

    if (error) throw new Error(error.message);
    return data;
};

export async function deleteCompany(companyId) {
    const { error } = await supabase
    .from('company')    
    .delete()
    .eq('id', companyId);

    if (error) throw new Error(error.message);
}