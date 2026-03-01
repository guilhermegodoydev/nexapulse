import { useQuery } from "@tanstack/react-query";
import { getCompaniesSummary, getCompaniesStat, getCompanyMinimal } from "../api/api";
import { companyMinimalFormSchema, companySummarySchema } from "../model/schema";
import { companiesStatSchema } from "../model/statSchema";
import { z } from "zod";
import { useSession } from "@entities/user/model/sessionContext";

export function useCompaniesSummary(page = 0, pageSize = 25, search) {
  const { session } = useSession();

  return useQuery({
    queryKey: ["companiesSummary", { page, pageSize, search }, session?.user?.id],
    queryFn: async () => {
      const { data, total } = await getCompaniesSummary(page, pageSize, search);
      const validate = z.array(companySummarySchema).parse(data);
      return { rows: validate, total };
    },
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
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
    staleTime: 5 * 60 * 1000,
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
    staleTime: 5 * 60 * 1000,
  });
}
