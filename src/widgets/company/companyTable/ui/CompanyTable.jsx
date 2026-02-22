import { columns } from "../config/columns";
import { Table, TableSkeleton } from "@shared/ui/table/Table";

export function CompanyTable({ data, isLoading, currentPage, totalPages, onPageChange, pageSize }) {

    if (isLoading) return <TableSkeleton rows={pageSize} columns={columns.length}/>;

    return (
        <Table 
            columns={columns} 
            data={data?.rows}  
            emptyMessage={"Nenhuma Empresa encontrada"}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
        />
    );
};