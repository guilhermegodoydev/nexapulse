import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Variáveis de ambiente do Supabase não configuradas. ' +
        'Certifique-se de que VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY estão definidas no arquivo .env'
    );
}

export const supabase = createClient(supabaseUrl, supabaseKey);