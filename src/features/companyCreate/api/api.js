import { supabase } from '@shared/api/supabaseClient';

export async function createCompany(company) {
    const { data, error } = await supabase
        .from('company')
        .insert([company])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}