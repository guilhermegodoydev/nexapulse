import { Table } from "@shared/ui/Table";

export function CompanyList() {
    const columns = [
        { label: "Nome da Empresa", accessor: "companyName" },
        { label: "Setor", accessor: "sector" },
        { label: "Localização", accessor: "location" },
        { label: "Número de Funcionários", accessor: "employeeCount" },
    ];

    const data = [
        { companyName: "Tech Solutions", sector: "Tecnologia", location: "São Paulo, Brasil", employeeCount: 250 },
        { companyName: "HealthCorp", sector: "Saúde", location: "Rio de Janeiro, Brasil", employeeCount: 150 },
        { companyName: "EduFuture", sector: "Educação", location: "Belo Horizonte, Brasil", employeeCount: 100 },
        { companyName: "FinServe", sector: "Financeiro", location: "Curitiba, Brasil", employeeCount: 300 },
    ];
    
    return (
        <section className="p-10">
            <Table columns={columns} data={data} />
        </section>
    );
};