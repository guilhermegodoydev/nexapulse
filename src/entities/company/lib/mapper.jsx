export function mapToCompanySummary (company) {
    const STATUS_VARIANTS = {
        ativo: 'success',
        inativo: 'neutral',
        churn: 'danger'
    };

    return {
        id: company.id,
        tradeName: company.trade_name,
        status: { 
            label: company.status,
            variant: STATUS_VARIANTS[company.status.toLowerCase()] || 'neutral',
        },
        industry: company.industry,
        lifecycleStage: company.lifecycle_stage.charAt(0).toUpperCase() + company.lifecycle_stage.slice(1).toLowerCase(),
        revenue: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1}).format(company.annual_revenue) || 0,
        lastContact: company.company_contact?.[0]?.last_contact || 'Não informado',
        mainContactName: company.company_contact?.[0]?.name || 'Não informado',
    };
}