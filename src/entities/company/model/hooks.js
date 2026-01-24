import { useQuery } from '@tanstack/react-query';
import { getCompaniesSummary } from '../api/api';
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
            mainContactName: company.company_contact?.[0]?.name || 'Não informado',
        })),
    });
}