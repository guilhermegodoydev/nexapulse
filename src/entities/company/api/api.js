import { supabase } from '@shared/api/supabaseClient';

export async function getCompaniesSummary(page = 0, pageSize = 25, search) {
    const fromItem = page * pageSize;
    const toItem = fromItem + pageSize - 1;

    let query = supabase
        .from('company')
        .select('id, trade_name, status, annual_revenue, lifecycle_stage, industry, company_contact( name, last_contact )', { count: 'exact'})
        .eq('company_contact.is_main_contact', true)

    if (search) {
        query = query.or(`trade_name.ilike.%${search}%`);
    }

    const { data , count, error } = await query
        .order('trade_name', { ascending: true })
        .range(fromItem, toItem);

    if (error) throw new Error(error.message);
    return { data, total: count || 0 };
};

export async function getCompaniesStat() {
    const { data, error } = await supabase.rpc('get_company_stats')

    if (error) throw new Error(error.message);
    return data;
}

export async function getCompanyMinimal(companyId) {
    const { data, error } = await supabase
        .from('company')
        .select('trade_name, legal_name, cnpj, website, industry, employees, annual_revenue, status, lifecycle_stage')
        .eq('id', companyId)
        .single();
    
    if (error) throw new Error(error.message);
    return data;
}

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