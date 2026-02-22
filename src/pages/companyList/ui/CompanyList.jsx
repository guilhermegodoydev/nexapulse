import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import { StatCard } from "@shared/ui/card/StatCard";

import { CardSkeleton } from "@shared/ui/card/Card"
import { Button } from "@shared/ui/Button"
import { SearchBar } from "@shared/ui/SearchBar";

import { useCompaniesSummary, useCompaniesStat } from "@entities/company/model/hooks";

import { CreateCompanyFeature } from "@features/companyCreate/ui/CreateCompanyFeature";
import { CompanyTable } from "@widgets/company/companyTable/ui/CompanyTable";

export function CompanyList() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ debouncedSearch, setDebouncedSearch ] = useState("");
    const page = Number(searchParams.get('page') || 0);
    const pageSize = 25;
    const { data, isError, isLoading } = useCompaniesSummary(page, pageSize, debouncedSearch);
    const { data: companiesState, isError: isStatError, isLoading: isStatLoading } = useCompaniesStat();

    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;

    const handleSearch = (value) => {
        if (page !== 0) {
            handlePageChange(0);
        }
        setDebouncedSearch(value);
    }

    const handlePageChange = (newPage) => {
        setSearchParams({ page: String(newPage)});
    };

    const generateComparativeMessage = (value, percentage) => {
        if (value === 0 || !value) {
            return "Nenhuma comparação disponínel";
        }

        return `${percentage}% vs Mês Anterior`;
    };

    if (isError || isStatError) {
        return <div>Erro ao carregar a lista de empresas.</div>;
    }

    return (
        <>
            <header>
                <div className="flex items-center justify-between px-5">
                    <h1>Empresas</h1>

                    <div>
                        <CreateCompanyFeature renderTrigger={({ onClick, isPending }) => (
                            <Button 
                                label="Adicionar" 
                                className="bg-brand-primary text-white m-2 p-1 px-2 rounded-md" 
                                onClick={onClick}
                                isLoading={isPending}
                            />
                        )}
                        />
                    </div>
                </div>
                <hr />
            </header>
            <main>
                <section className="grid grid-cols-3 gap-10 min-h-35">
                    {isStatLoading ? 
                        <>
                            <CardSkeleton/>
                            <CardSkeleton/>
                            <CardSkeleton/>
                        </>
                        :
                        <>
                            <StatCard 
                                title="Empresas Ativas" 
                                value={companiesState.activeCompanies} 
                                intent="neutral"
                            />
                            <StatCard 
                                title="Empresas sem Contato(> 30 dias)" 
                                value={companiesState.companiesAtRisk.currentValue} 
                                comparative={companiesState.companiesAtRisk.isPositve === true ? "-" : "+" + generateComparativeMessage(companiesState.companiesAtRisk.currentValue, companiesState.companiesAtRisk.percentageChange)}
                                trend={companiesState.companiesAtRisk.isPositve === true ? "down" : "up"}
                                intent={companiesState.companiesAtRisk.isPositve === true ? "positive" : "negative"}
                            />
                            <StatCard title="Pipeline Total" value={companiesState.openOpportunitiesValue}/>
                        </>   
                    }
                </section>
                <section>
                    <SearchBar isLoading={isLoading} onSearch={handleSearch} placeholder="Nome da Empresa"/>

                    <CompanyTable 
                        data={data} 
                        isLoading={isLoading} 
                        currentPage={page + 1} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                        pageSize={pageSize}
                    />
                </section>
            </main>
        </>
    );
};