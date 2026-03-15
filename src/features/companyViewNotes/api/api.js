import { supabase } from "@shared/api/supabaseClient";

export async function getCompanyNotes(companyId, limit = 5) {
  const { data, error } = await supabase
    .from("notes")
    .select("id, title, description, created_at")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao buscar notas da empresa:", error);
    throw new Error(
      error.message ||
        "Erro ao buscar notas da empresa. Tente novamente mais tarde.",
    );
  }
  return data;
}
