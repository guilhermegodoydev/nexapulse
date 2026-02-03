import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getCompaniesSummary, getCompaniesStat, createCompany } from '../api/api';
import { companySummarySchema } from '../model/schema';
import { companiesStatSchema } from '../model/statSchema';
import { z } from 'zod';

export function useCompaniesSummary(page = 0, pageSize = 25, search) {
    return useQuery({
        queryKey: ['companiesSummary', { page, pageSize, search }],
        queryFn: async () => {
            const { data, total } = await getCompaniesSummary(page, pageSize, search);
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

export function useCompaniesStat() {
    return useQuery({
        queryKey: ['companiesStat'],
        queryFn: async () => {
            const data = await getCompaniesStat();
            return companiesStatSchema.parse(data);
        },
        staleTime: 5 * 60 * 1000
    });
}

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-company'],
        mutationFn: async (company) => { 
            const empresa = await createCompany(company);
            console.log(empresa);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
        },
    });
}