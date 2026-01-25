export function Button({ label = '', renderItem = null, onClick, props, isLoading }) {
    return (
        <button 
            className={isLoading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'} 
            onClick={onClick}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 
                <div className="h-5 w-5 border-3 border-gray-300 border-t-brand-primary animate-spin rounded-full"></div>
                : (renderItem ? renderItem() : label)
            }
        </button>
    );
};