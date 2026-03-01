import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany } from '../api/api';

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCompany,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['companiesStat']});
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
            toast.success(`Empresa ${variables.trade_name} Criada!`);
        },
        onError: (_, variables) => {
            toast.error(`Falha ao criar empresa ${variables.trade_name}`);
        }
    });
}