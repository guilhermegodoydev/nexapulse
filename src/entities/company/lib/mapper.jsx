export function mapToCompanySummary (company) {
    return {
        id: company.id,
        tradeName: company.trade_name,
        status: company.status,
        revenue: company.annual_revenue || 0,
        lastContact: company.company_contact?.[0]?.last_contact || 'Não informado',
        mainContactName: company.company_contact?.[0]?.name || 'Não informado',
    };
}