import { createContext, useContext } from "react";

export const SessionContext = createContext();

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession deve ser usado dentro de um SessionProvider");
    }
    return context;
}