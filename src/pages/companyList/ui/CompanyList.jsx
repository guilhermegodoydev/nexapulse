import { Button } from "@shared/ui/Button";
import { Table, TableSkeleton } from "@shared/ui/table/Table";
import { StatCard } from "@shared/ui/card/StatCard";
import { Badge } from "@shared/ui/badge/Badge";
import { Card, CardSkeleton } from "@shared/ui/card/Card"
import { useDebounce } from "@shared/lib/hooks/useDebounce";

import { useCompaniesSummary, useCompaniesStat } from "@entities/company/model/hooks";

import { DeleteCompanyButton } from "@features/companyDelete/ui/DeleteCompanyButton";

import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";


export function CompanyList() {
    const [ search, setSearch ] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = Number(searchParams.get('page') || 0);
    const pageSize = 25;
    const { data, isError, isLoading, isFetching } = useCompaniesSummary(page, pageSize, debouncedSearch);
    const { data: companiesState, isError: isStatError, isLoading: isStatLoading } = useCompaniesStat();

    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;

    useEffect(() => {
        if (page !== 0) {
            setSearchParams({ page: String(0)});
        }
    }, [debouncedSearch]);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: String(newPage)});
    };

    const renderActions = ({ id, tradeName }) => {
        return (
            <div className="flex items-center justify-center">
                <DeleteCompanyButton companyId={id} companyName={tradeName} />
            </div>
        );
    };

    const addBadges = ({ status }) => {
        return (
            <Badge label={status.label} variant={status.variant}/>
        );
    };
    
    const addBadgeLifeCycle = ({ tradeName, lifecycleStage }) => {
        return (
            <div className="flex items-center gap-2">
                <p className="font-semibold">{tradeName}</p>
                <Badge label={lifecycleStage} variant="neutral"/>
            </div>
        );
    };

    const generateComparativeMessage = (value, percentage) => {
        if (value === 0 || !value) {
            return "Nenhuma comparação disponínel";
        }

        return `${percentage}% vs Mês Anterior`;
    };

    const columns = [
        {label: 'Empresa', key: '', render: addBadgeLifeCycle},
        {label: 'Status', key: '', render: addBadges},
        {label: 'Contato', key: 'mainContactName'},
        {label: 'Setor', key: 'industry'},
        {label: 'Receita Anual', key: 'revenue'},
        {label: 'Último Contato', key: 'lastContact', className: 'text-center'},
        {label: 'Ações', key: '', render: renderActions, className: 'text-center w-20'},
    ];

    if (isError || isStatError) {
        return <div>Erro ao carregar a lista de empresas.</div>;
    }

    const isSearching = isFetching && search !== debouncedSearch;

    return (
        <>
            <header>
                <div className="flex items-center justify-between px-5">
                    <h1>Empresas</h1>

                    <div>
                        <Button label="Adicionar" />
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
                    <Card className="flex gap-3">
                        <Button renderItem={() => <Search className="text-content-base"/>} isLoading={isSearching}/>
                        <input type="text" placeholder="Nome da Empresa" className="w-full px-2 dark:text-white" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    </Card>
                    {isLoading ? 
                        <TableSkeleton rows={pageSize} columns={columns.length}/>
                        :
                        <Table 
                            columns={columns} 
                            data={data?.rows}  
                            emptyMessage={"Nenhuma Empresa encontrada"}
                            currentPage={page + 1}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    }
                </section>
            </main>
        </>
    );
};