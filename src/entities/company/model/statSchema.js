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
    activeCompanies: stat?.active_companies ?? 0,
    companiesAtRisk: {
        currentValue: stat?.companies_at_risk?.current_value ?? 0,
        previousMonth: stat?.companies_at_risk?.previous_month ?? 0,
        percentageChange: stat?.companies_at_risk?.percentage_change ?? 0,
        isPositive: stat?.companies_at_risk?.is_positive ?? false,
    },
    openOpportunitiesValue: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(stat.open_opportunities_value || 0),
}));