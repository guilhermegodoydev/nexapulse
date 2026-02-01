import { supabase } from '@shared/api/supabaseClient';

export async function getCompaniesSummary(page = 0, pageSize = 25) {
    const fromItem = page * pageSize;
    const toItem = fromItem + pageSize - 1;

    const { data, error, count } = await supabase
        .from('company')
        .select('id, trade_name, status, annual_revenue, lifecycle_stage, industry, company_contact( name, last_contact )', { count: 'exact'})
        .eq('company_contact.is_main_contact', true)
        .order('created_at', { ascending: false })
        .range(fromItem, toItem);

    if (error) throw new Error(error.message);
    return { data, total: count || 0 };
};

export async function deleteCompany(companyId) {
    const { error } = await supabase
    .from('company')    
    .delete()
    .eq('id', companyId);

    if (error) throw new Error(error.message);
}

export async function getCompaniesStat() {
    const { data, error } = await supabase.rpc('get_company_stats')

    if (error) throw new Error(error.message);
    return { data }
}