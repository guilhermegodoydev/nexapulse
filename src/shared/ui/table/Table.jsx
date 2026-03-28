import { TableSkeleton } from "./TableSkeleton";
import { TABLE_STYLE, THEAD_STYLE} from "./config";

export function Table({ columns, data, emptyMessage, isLoading = false, rows }) {
    if (isLoading) return <TableSkeleton rows={rows} columns={columns.length}/>;

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
        </>
    );
};