import { z } from 'zod';
import { companyContactSchema } from '../../companyContact/model/schema';

export const companySchema = z.object({
    id: z.uuid(),
    trade_name: z.string().min(2).max(100),
    legal_name: z.string().min(2).max(150).nullable(),
    cnpj: z.string().min(14).max(18).nullable(),
    industry: z.string().min(2).max(50),
    employees: z.int().min(0).nullable(),
    status: z.enum(['ATIVO', 'INATIVO', 'CHURN']).default('ATIVO'),
    lifecycle_stage: z.enum(['LEAD', 'CLIENTE']).default('LEAD'),
    annual_revenue: z.number().min(0).nullable(),
    website: z.url().nullable().or(z.literal('')),
    created_at: z.string(),
});

export const createCompanySchema = companySchema.omit({
    id: true,
    created_at: true,
});

export const updateCompanySchema = createCompanySchema.partial();

export const companySummarySchema = companySchema.pick({
    id: true,
    trade_name: true,
    status: true,
    lifecycle_stage: true,
    annual_revenue: true,
    industry: true,
}).extend({
    company_contact: z.array(
        companyContactSchema.pick({ name: true, last_contact: true })
    ).nullable(),
});
