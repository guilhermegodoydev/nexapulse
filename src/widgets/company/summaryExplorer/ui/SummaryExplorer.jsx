import { useMediaQuery } from "@shared/lib/useMediaQuery";
import { useCompaniesSummary } from "@entities/company/model/hooks";
import { SearchBar } from "@shared/ui/SearchBar";
import { usePagination } from "@shared/lib/usePagination";
import { useState } from "react";
import { CompanyList } from "./CompanyList";
import { Table } from "@shared/ui/table/Table";
import { columns } from "./config/columns";

export function SummaryExplorer() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [ debouncedSearch, setDebouncedSearch ] = useState("");
    const { page, pageSize, handlePageChange } = usePagination();
    const { data, isError, isLoading } = useCompaniesSummary(page, pageSize, debouncedSearch);

    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;

    const handleSearch = (value) => {
        if (page !== 0) {
            handlePageChange(0);
        }
        setDebouncedSearch(value);
    }

    if (isError) {
        return <p className="text-content-base">Erro ao carregar a lista de empresas.</p>
    }

    return (
        <section>
            <SearchBar isLoading={isLoading} onSearch={handleSearch} placeholder="Nome da Empresa" className="mt-10 mb-5"/>

            {isMobile ? 
                <CompanyList companies={data?.rows || []} />
                :
                <Table 
                    rows={pageSize}
                    data={data?.rows}  
                    columns={columns} 
                    emptyMessage={"Nenhuma Empresa encontrada"}
                    isLoading={isLoading} 
                    currentPage={page + 1} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                    pageSize={pageSize}
                />
            }
        </section>
    );
};