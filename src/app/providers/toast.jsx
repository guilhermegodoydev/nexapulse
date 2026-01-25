import { Toaster } from "sonner";

export function ToastProvider({ children}) {
    return (
        <>
            <Toaster position="top-right" richColors expand={false}/>
            {children}
        </>
    );
};