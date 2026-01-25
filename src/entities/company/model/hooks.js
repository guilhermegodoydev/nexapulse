import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getCompaniesSummary } from '../api/api';
import { companySummarySchema } from '../model/schema';
import { z } from 'zod';

export function useCompaniesSummary() {
    return useQuery({
        queryKey: ['companiesSummary'],
        queryFn: async () => {
            const companies = await getCompaniesSummary();
            return z.array(companySummarySchema).parse(companies);
        },
        select: (companies) => companies.map(company => ({
            id: company.id,
            tradeName: company.trade_name,
            status: company.status,
            revenue: company.annual_revenue || 0,
            lastContact: company.company_contact?.[0]?.last_contact || 'Não informado',
            mainContactName: company.company_contact?.[0]?.name || 'Não informado',
        })),
    });
}

export function useDeleteCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companiesSummary']});
        },
    });
}