import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCompany } from '../api/api';
import { toast } from "sonner";

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ companyId, updates}) => updateCompany(companyId, updates),
        onSuccess: (updatedCompany) => {
            queryClient.setQueryData(['companyBasic', updatedCompany.id], updatedCompany);            
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
            queryClient.invalidateQueries({ queryKey: ['companiesStat']});
            toast.success(`Dados da empresa ${updatedCompany.trade_name} alterados com Sucesso!`);
        },
        onError: (_, variables) => {
            toast.error(`Falha ao alterar dados de empresa ${variables.companyName}`);
        }
    });
}