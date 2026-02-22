const generateComparativeMessage = (value, percentage) => {
    if (value === 0 || !value) {
        return "Nenhuma comparação disponínel";
    }

    return `${percentage}% vs Mês Anterior`;
};

export function CompanyKpiCards({ isLoading, companies}) {

    const gridStyle = "grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[140px]";

    const risk = companies.companiesAtRisk;
    const riskTrend = risk.isPositve ? "down" : "up";
    const riskIntent = risk.isPositve ? "positive" : "negative";
    const riskMessage = risk.isPositve  ? "-" : `+${generateComparativeMessage(risk.currentValue, risk.percentageChange)}`;

    if (isLoading) {
        return (
            <section className={gridStyle}>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </section>
        );
    }

    return (
        <section className={gridStyle}>
            <StatCard 
                title="Empresas Ativas" 
                value={companies.activeCompanies} 
                intent="neutral"
            />
            <StatCard 
                title="Empresas sem Contato(> 30 dias)" 
                value={risk.currentValue} 
                comparative={riskMessage}
                trend={riskTrend}
                intent={riskIntent}
            />
            <StatCard 
                title="Pipeline Total" 
                value={companies.openOpportunitiesValue}
            />
        </section>
    );
};