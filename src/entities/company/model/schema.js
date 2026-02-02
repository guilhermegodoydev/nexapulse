import { z } from 'zod';
import { companyContactSchema } from '../../companyContact/model/schema';

const STATUS_VARIANTS = {
    ativo: 'success',
    inativo: 'neutral',
    churn: 'danger'
};

export const companySchema = z.object({
    id: z.uuid(),
    trade_name: z.string().min(1, 'O nome é obrigatório').min(2, 'O nome é muito curto').max(100, 'O nome é muito longo'),
    legal_name: z.preprocess((v) => v === "" ? null : v, z.string().min(2, 'O nome legal é muito curto').max(150).nullable()),
    cnpj: z.preprocess((v) => v === "" ? null : v, z.string().min(14, 'CNPJ Incompleto').max(18, 'CNPJ Inválido').nullable()),
    industry: z.string().min(1, 'O setor é obrigatório').min(2, 'O setor é muito curto').max(50),
    employees: z.preprocess((v) => v === "" ? null : v, z.coerce.number().int().min(0, 'Valor inválido').nullable()),
    status: z.enum(['ATIVO', 'INATIVO', 'CHURN']).default('ATIVO'),
    lifecycle_stage: z.enum(['LEAD', 'CLIENTE']).default('LEAD'),
    annual_revenue: z.preprocess((v) => v === "" ? null : v, z.coerce.number().min(0, 'A renda não pode ser negativa').nullable()),
    website: z.preprocess((v) => v === "" ? null : v, z.url('URL Inválida').nullable()),
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
}).transform((company) => ({
    id: company.id,
    tradeName: company.trade_name,
    status: { 
        label: company.status,
        variant: STATUS_VARIANTS[company.status.toLowerCase()] || 'neutral',
    },
    industry: company.industry,
    lifecycleStage: company.lifecycle_stage.charAt(0).toUpperCase() + company.lifecycle_stage.slice(1).toLowerCase(),
    revenue: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1}).format(company.annual_revenue) || 0,
    lastContact: new Date(company.company_contact?.[0]?.last_contact + 'T00:00:00').toLocaleDateString() || 'Não informado',
    mainContactName: company.company_contact?.[0]?.name || 'Não informado',
}));
