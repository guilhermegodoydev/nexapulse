import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button";

const TABLE_STYLE = "rounded-md border-collapse w-full shadow-2xl [&_th]:p-1 [&_td]:py-2 [&_td]:px-10";
const THEAD_STYLE = "bg-bg-card border-b-2 border-border";

export function Table({ columns, data, totalPages = null, currentPage = null, onPageChange = () => {}, emptyMessage, isLoading = false, rows }) {
    if (isLoading) return <TableSkeleton rows={rows} columns={columns.length}/>;


    const styleButton="bg-bg-card border border-brand-primary text-content-base hover:bg-hover-bg hover:text-hover-text disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md mt-4";

    const getValue = (obj, path) => {
        if (!path) return '';
        return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
    };

    return (
        <>
            <table className={`${TABLE_STYLE} [&_tr]:text-content-base`}>
                <thead className={`${THEAD_STYLE} text-content-base font-medium [&_th]:text-brand-primary`}>
                    <tr>
                        {columns.map((column) => (
                            <th className="first:rounded-tl-md last:rounded-tr-md" key={column.label}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-bg-card [&_td]:text-sm [&_tr:hover]:text-hover-text [&_tr:nth-child(odd)]:bg-card [&_tr:hover]:bg-blue-500/10 [&_td]:border-t [&_td]:border-border">
                    {!data || data.length === 0 ? (
                        <tr>
                            <td className="text-center p-5 rounded-b-md" colSpan={columns.length}>{emptyMessage}</td>
                        </tr>
                        ) 
                        :
                        (data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, index) => {
                                    const isLastRow = rowIndex === data.length - 1;
                                    const isLastColumn = index === columns.length - 1;

                                    const style = isLastRow && index === 0 ? "rounded-bl-md" : isLastRow && isLastColumn ? "rounded-br-md" : "";

                                    return (
                                        <td className={style + ' ' + column.className} key={column.label}>
                                            {column.render ? column.render(row) : (column.key ? getValue(row, column.key) : '')}
                                        </td>
                                    );
                                })}
                            </tr>
                    )))}

                </tbody>
            </table>
            {totalPages ?
                <div className="flex justify-between">
                    <Button className={styleButton + (currentPage > 1 ? "" : " invisible")} onClick={() => onPageChange(currentPage - 2)} renderItem={() => 
                        <div className="flex items-center gap-3">
                            <ArrowLeft/>
                            <p>Anterior</p>
                        </div>
                    }/>
                    <Button label={`Página ${currentPage}`} className={styleButton}/>
                    <Button className={styleButton + (currentPage < totalPages ? "" : " invisible")} onClick={() => onPageChange(currentPage)} renderItem={() => 
                        <div className="flex items-center gap-3">
                            <p>Próximo</p>
                            <ArrowRight/>
                        </div>
                    }/>
                </div>
            : null}
        </>
    );
};

function TableSkeleton({ rows = 8, columns = 6 }) {
    const cols = Array.from({ length: columns });
    const rowsArr = Array.from({ length: rows });

    return (
        <div aria-busy="true" className="w-full">
            <table className={TABLE_STYLE}>
                <thead className={THEAD_STYLE}>
                    <tr>
                        {cols.map((_, i) => (
                            <th key={i} className="first:rounded-tl-md last:rounded-tr-md p-1 text-left">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full max-w-[220px]" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-bg-card [&_td]:text-sm [&_tr:nth-child(odd)]:bg-card">
                    {rowsArr.map((_, r) => (
                        <tr key={r}>
                            {cols.map((__, c) => (
                                <td key={c} className="py-2 px-10 align-top">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full max-w-[200px]" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};