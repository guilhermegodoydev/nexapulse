export function TableSkeleton({ rows = 8, columns = 6 }) {
    const cols = Array.from({ length: columns });
    const rowsArr = Array.from({ length: rows });

    return (
        <div aria-busy="true" className="w-full">
            <table className="rounded-md border-collapse w-full shadow-2xl [&_th]:p-1 [&_td]:py-2 [&_td]:px-10">
                <thead className="bg-bg-card border-b-2 border-border">
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