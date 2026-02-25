import { forwardRef } from "react";

export const Input = forwardRef(({ id, label, props, errorMessage, ...rest}, ref) => {
    return (
        <div className="flex flex-col relative justify-center">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                {...props}
                ref={ref}
                className="h-10 rounded-md bg-gray-50 dark:bg-gray-700 pl-3 focus:outline-brand-primary shadow" 
                {...rest}
            />
            {errorMessage ? <p className="text-red-500 text-xs mt-1">{errorMessage}</p> : null}
        </div>
    );
});

Input.displayName = "Input";