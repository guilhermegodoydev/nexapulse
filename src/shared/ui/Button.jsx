export function Button({ label = "", children, onClick = () => {}, isLoading = false, className = "", ...rest }) {
    return (
        <button 
            className={isLoading ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer' + ' ' + className} 
            onClick={onClick}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? 
                <div className="h-5 w-5 border-3 border-gray-300 border-t-brand-primary animate-spin rounded-full"></div>
                : (children ? children : label)
            }
        </button>
    );
};