import { forwardRef } from "react";

export const Textarea = forwardRef(({ label, errorMessage, className, ...props }, ref) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            {label && <label className="text-sm font-medium text-content-base">{label}</label>}
            
            <textarea
                ref={ref}
                className={`
                    w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 
                    rounded-md resize-none h-28 outline-none transition-all
                    border border-transparent focus:ring-2 focus:ring-brand-primary
                    ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'focus:border-brand-primary'}
                    ${className}
                `}
                {...props}
            />
            
            {errorMessage && (
                <span className="text-red-500 text-xs animate-in fade-in slide-in-from-top-1">
                    {errorMessage}
                </span>
            )}
        </div>
    );
});

Textarea.displayName = "Textarea";