import { Button } from "@shared/ui/Button";
import { Table } from "@shared/ui/table/Table";
import { useCompaniesSummary } from "@entities/company/model/hooks";
import { DeleteCompanyButton } from "@features/companyDelete/ui/DeleteCompanyButton";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@shared/ui/badge/Badge"

export function CompanyList() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = Number(searchParams.get('page') || 0);
    const pageSize = 25;
    const { data, isError, isLoading } = useCompaniesSummary(page, pageSize);

    const totalCount = data?.total || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

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
                <p className="text-gray-700 font-semibold">{tradeName}</p>
                <Badge label={lifecycleStage} variant="neutral"/>
            </div>
        );
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

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar a lista de empresas.</div>;
    }

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
            <section>
                <div>
                    <h3>Quantidade de empresas</h3>

                </div>
            </section>
            <section className="p-10">
                <Table 
                    columns={columns} 
                    data={data?.rows}  
                    currentPage={page + 1}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>
        </>
    );
};