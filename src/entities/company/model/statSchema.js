import { z } from "zod";

export const companiesStatSchema = z.object({
    active_companies: z.number(),
    companies_at_risk: z.object({
        current_value: z.number(),
        previous_month: z.number(),
        percentage_change: z.number(),
        is_positive: z.boolean(),
    }),
    open_opportunities_value: z.number(),
}).transform((stat) => ({
    activeCompanies: stat.active_companies,
    companiesAtRisk: {
        currentValue: stat.companies_at_risk.current_value,
        previousMonth: stat.companies_at_risk.previous_month,
        percentageChange: stat.companies_at_risk.percentage_change,
        isPositive: stat.companies_at_risk.is_positive,
    },
    openOpportunitiesValue: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(stat.open_opportunities_value),
}));