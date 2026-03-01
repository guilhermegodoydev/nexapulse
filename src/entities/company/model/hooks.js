import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getCompaniesSummary, getCompaniesStat, createCompany, getCompanyMinimal, updateCompany, requestCompanyDeletion } from '../api/api';
import { companyMinimalFormSchema, companySummarySchema } from '../model/schema';
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
        mutationKey: ['delete-company'],
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companiesStat']});
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
        mutationFn: createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companiesStat']});
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
        },
    });
}

export function useCompanyMinimal(companyId) {
    return useQuery({
        queryKey: ['companyBasic', companyId],
        queryFn: async () => {
            const data = await getCompanyMinimal(companyId);
            const validate = companyMinimalFormSchema.parse(data);
            return validate;
        },
        enabled: !!companyId,
        staleTime: 5 * 60 * 1000
    });
}

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ companyId, updates}) => updateCompany(companyId, updates),
        onSuccess: (updatedCompany) => {
            queryClient.setQueryData(['companyBasic', updatedCompany.id], updatedCompany);            
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
            queryClient.invalidateQueries({ queryKey: ['companiesStat']});
        },
    });
}