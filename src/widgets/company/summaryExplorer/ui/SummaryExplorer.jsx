import { useMediaQuery } from "@shared/lib/useMediaQuery";
import { useCompaniesSummary } from "@entities/company/model/hooks";
import { SearchBar } from "@shared/ui/SearchBar";
import { CompanyList } from "./CompanyList";
import { Table } from "@shared/ui/table/Table";
import { columns } from "./config/columns";
import { useQueryParams } from "@shared/lib/useQueryParams";
import { TablePagination } from "../../../../shared/ui/table/TablePagination";

export function SummaryExplorer() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { getParams, setParams } = useQueryParams();
    const { data, isError, isLoading } = useCompaniesSummary();

    const page = Number(getParams("page")) || 0;
    const search = getParams("search") || "";
    const pageSize = 25;

    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;

    const handleSearch = (val) => {
        if (val !== search) {
            setParams({ search: val, page: 0 });
        }
    }

    const handlePageChange = (newPage) => {
        console.log("Tentando mudar para página:", newPage);
        setParams({ page: newPage });
    };

    if (isError) {
        return <p className="text-content-base">Erro ao carregar a lista de empresas.</p>
    }

    return (
        <section>
            <SearchBar 
                isLoading={isLoading} 
                onSearch={handleSearch} 
                defaultValue={search}
                placeholder="Nome da Empresa" 
                className="mt-10 mb-5"
            />

            {isMobile ? 
                <CompanyList companies={data?.rows || []} />
                :
                <>
                    <Table 
                        rows={pageSize}
                        data={data?.rows}  
                        columns={columns} 
                        emptyMessage={"Nenhuma Empresa encontrada"}
                        isLoading={isLoading}  
                        pageSize={pageSize}
                    />
                    <TablePagination currentPage={page + 1} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            }
        </section>
    );
};