import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestCompanyDeletion } from "../api";

export function useRequestCompanyDeletion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ companyId }) => requestCompanyDeletion(companyId),
        onSuccess: (_, variables) => {
            toast.success(`Solicitação de exclusão para a empresa ${variables.companyName} enviada com sucesso!`);
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
        },
        onError: (_, variables) => {
            toast.error(`Erro ao solicitar exclusão para a empresa ${variables.companyName}. Tente novamente mais tarde.`);
        }
    });
}