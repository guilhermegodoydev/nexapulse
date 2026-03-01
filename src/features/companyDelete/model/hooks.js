import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "../api";

export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-company'],
        mutationFn: ({ companyId }) => deleteCompany(companyId),
        onSuccess: (_, variables ) => {
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
            toast.success(`Empresa ${variables.companyName} excluída com sucesso!`);
        },
        onError: (_, variables) => {
            toast.error(`Erro ao excluir a empresa ${variables.companyName}. Tente novamente mais tarde.`);
        }
    });
}