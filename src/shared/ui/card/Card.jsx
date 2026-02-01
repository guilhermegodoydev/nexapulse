export function Card({ children, className }) {
    return (
        <div className={`bg-bg-card p-2 border border-border rounded-md shadow-sm ${className}`}>
            {children}
        </div>
    );
};