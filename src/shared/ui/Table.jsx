export function Table({ columns, data }) {
    return (
        <table className="border-collapse shadow-2xl w-full [&_th]:p-1 [&_td]:py-2 [&_td]:px-10 [&_tr]:text-content-base">
            <thead className="text-content-base bg-bg-card border-b-2 border-border font-medium [&_th]:text-brand-primary">
                <tr>
                    {columns.map((column) => (
                        <th key={column.label}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-bg-card [&_td]:text-sm [&_tr:hover]:text-hover-text [&_tr:nth-child(odd)]:bg-card [&_tr:hover]:bg-blue-500/10 [&_td]:border-t [&_td]:border-border">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column.label}>
                                {row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};