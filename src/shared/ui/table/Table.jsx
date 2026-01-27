import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button";

export function Table({ columns, data, totalPages = null, currentPage = null, onPageChange = () => {} }) {

    const styleButton="bg-bg-card border border-brand-primary text-content-base hover:bg-hover-bg hover:text-hover-text disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md mt-4";

    return (
        <>
            <table className="rounded-md border-collapse shadow-2xl w-full [&_th]:p-1 [&_td]:py-2 [&_td]:px-10 [&_tr]:text-content-base">
                <thead className="text-content-base bg-bg-card border-b-2 border-border font-medium [&_th]:text-brand-primary">
                    <tr>
                        {columns.map((column) => (
                            <th className="first:rounded-tl-md last:rounded-tr-md" key={column.label}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-bg-card [&_td]:text-sm [&_tr:hover]:text-hover-text [&_tr:nth-child(odd)]:bg-card [&_tr:hover]:bg-blue-500/10 [&_td]:border-t [&_td]:border-border">
                    {
                    data && data.length === 0 ? (
                        <tr>
                            <td className="text-center p-5 rounded-b-md" colSpan={columns.length}>Nenhum dado disponível.</td>
                        </tr>
                    ) :
                    (data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, index) => {
                                const isLastRow = rowIndex === data.length - 1;
                                const isLastColumn = index === columns.length - 1;

                                const style = isLastRow && index === 0 ? "rounded-bl-md" : isLastRow && isLastColumn ? "rounded-br-md" : "";

                                return (
                                    <td className={style + ' ' + column.className} key={column.label}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                );
                            })}
                        </tr>
                    )))}

                </tbody>
            </table>
            {totalPages &&
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
            }
        </>
    );
};