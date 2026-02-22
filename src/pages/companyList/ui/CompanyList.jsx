import { useState } from "react";

import { Button } from "@shared/ui/Button"
import { SearchBar } from "@shared/ui/SearchBar";
import { usePagination } from "@shared/lib/usePagination";

import { useCompaniesSummary, useCompaniesStat } from "@entities/company/model/hooks";

import { CreateCompanyFeature } from "@features/companyCreate/ui/CreateCompanyFeature";

import { CompanyTable } from "@widgets/company/companyTable/ui/CompanyTable";
import { CompanyKpiCards } from "@widgets/company/companyStats/ui/CompanyKpiCards";

export function CompanyList() { 
    const [ debouncedSearch, setDebouncedSearch ] = useState("");
    const { page, pageSize, handlePageChange } = usePagination();
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
                <CompanyKpiCards isLoading={isStatLoading} companies={companiesState}/>

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