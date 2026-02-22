import { StatCard } from "@shared/ui/card/StatCard";
import { CardSkeleton } from "@shared/ui/card/Card";

const generateComparativeMessage = (value, percentage) => {
    if (value === 0 || !value) {
        return "Nenhuma comparação disponínel";
    }

    return `${percentage}% vs Mês Anterior`;
};

export function CompanyKpiCards({ isLoading, companies}) {
    const gridStyle = "grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[140px]";
    
    if (isLoading) {
        return (
            <section className={gridStyle}>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </section>
        );
    }

    const risk = companies?.companiesAtRisk ?? { currentValue: 0, previousMonth: 0, percentageChange: 0, isPositive: true };
    const riskTrend = risk.isPositive ? "down" : "up";
    const riskIntent = risk.isPositive ? "positive" : "negative";
    const riskMessage = risk.isPositive ? "-" : `+${generateComparativeMessage(risk.currentValue, risk.percentageChange)}`;

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