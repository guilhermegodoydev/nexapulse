import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getCompaniesSummary } from '../api/api';
import { companySummarySchema } from '../model/schema';
import { z } from 'zod';

export function useCompaniesSummary(page = 0, pageSize = 25) {
    return useQuery({
        queryKey: ['companiesSummary', { page, pageSize }],
        queryFn: async () => {
            const { data, total } = await getCompaniesSummary(page, pageSize);
            const validate = z.array(companySummarySchema).parse(data);
            return { rows: validate, total };
        },
        staleTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    });
}

export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (companyId) => { await deleteCompany(companyId); },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
        },
    });
}