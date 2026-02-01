
const CARD_STYLE = "bg-bg-card p-2 border border-border rounded-md shadow-sm";

export function Card({ children, className }) {
    return (
        <div className={CARD_STYLE + " " + className}>
            {children}
        </div>
    );
};

export function CardSkeleton() {
    return (
        <div className={CARD_STYLE + " bg-gray-100 dark:bg-gray-700 animate-pulse"}>
        </div>
    );
};