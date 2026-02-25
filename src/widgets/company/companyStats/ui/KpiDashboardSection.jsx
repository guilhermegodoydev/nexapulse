import { StatCard } from "@shared/ui/card/StatCard";
import { CardSkeleton } from "@shared/ui/card/Card";

import { useCompaniesStat } from "@entities/company/model/hooks";

const generateComparativeMessage = (value, percentage) => {
    if (value === 0 || !value) {
        return "Nenhuma comparação disponínel";
    }

    return `${percentage}% vs Mês Anterior`;
};

export function KpiDashboardSection() {
    const { data, isError, isLoading} = useCompaniesStat();
    
    const gridStyle = "grid grid-cols-2 md:grid-cols-3 gap-10 min-h-[420px] md:min-h-[150px]";
    
    if (isLoading) {
        return (
            <section className={gridStyle}>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
            </section>
        );
    }

    if (isError) {
        return <div>Erro ao carregar a métricas de empresas.</div>;
    }

    const risk = data?.companiesAtRisk ?? { currentValue: 0, previousMonth: 0, percentageChange: 0, isPositive: true };
    const riskTrend = risk.isPositive ? "down" : "up";
    const riskIntent = risk.isPositive ? "positive" : "negative";
    const riskMessage = risk.isPositive ? "-" : `+${generateComparativeMessage(risk.currentValue, risk.percentageChange)}`;

    return (
        <section className={gridStyle}>
            <StatCard 
                title="Empresas Ativas" 
                value={data.activeCompanies} 
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
                value={data.openOpportunitiesValue}
            />
        </section>
    );
};