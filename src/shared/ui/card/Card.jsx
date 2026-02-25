
const CARD_STYLE = "text-content-base bg-bg-card p-2 border border-border rounded-md shadow-sm";

export function Card({ children, className }) {
    return (
        <div className={CARD_STYLE + " " + className}>
            {children}
        </div>
    );
};

export function CardSkeleton({ className}) {
    return (
        <div className={`${CARD_STYLE} bg-gray-100 dark:bg-gray-700 animate-pulse ${className}`}>
        </div>
    );
};