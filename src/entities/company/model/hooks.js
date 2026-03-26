import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCompaniesSummary, getCompaniesStat, getCompanyMinimal } from "../api/api";
import { companyMinimalFormSchema, companySummarySchema } from "../model/schema";
import { companiesStatSchema } from "../model/statSchema";
import { z } from "zod";
import { useSession } from "@entities/user/model/sessionContext";
import { useQueryParams } from "@shared/lib/useQueryParams";


export function useCompaniesSummary() {
  const { session } = useSession();
  const { getParams } = useQueryParams();

  const page = Number(getParams("page")) || 0;
  const pageSize = Number(getParams("pageSize")) || 25;
  const search = getParams("search") || "";

  return useQuery({
    queryKey: ["companiesSummary", { page, pageSize, search }, session?.user?.id],
    queryFn: async () => {
      const { data, total } = await getCompaniesSummary(page, pageSize, search);
      const validate = z.array(companySummarySchema).parse(data);
      return { rows: validate, total };
    },
    enabled: !!session,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, 
  });
}

export function useCompaniesStat() {
  const { session } = useSession();

  return useQuery({
    queryKey: ["companiesStat", session?.user?.id],
    queryFn: async () => {
        try {
            const data = await getCompaniesStat();
            return companiesStatSchema.parse(data);
        } catch (error) {
            console.error('Error ao carregar estatísticas das empresas', error);
            throw new Error(
                error?.message || 'Erro ao carregar estatísticas das empresas. Tente novamente mais tarde.'
            );
        }
    },
    enabled: !!session,
  });
}

export function useCompanyMinimal(companyId) {
  return useQuery({
    queryKey: ["companyBasic", companyId],
    queryFn: async () => {
        try {
            const data = await getCompanyMinimal(companyId);
            const validate = companyMinimalFormSchema.parse(data);
            return validate;
        }
        catch (error) {
            console.error('Error ao carregar dados da empresa minimal', error);
            throw new Error(
                error?.message || 'Erro ao carregar dados da empresa. Tente novamente mais tarde.'
            );
        }
    },
    enabled: !!companyId,
  });
}
