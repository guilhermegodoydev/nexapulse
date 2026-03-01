import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@shared/api/supabaseClient";

const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setIsInitialized(true);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <SessionContext.Provider value={{ session, isInitialized }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession deve ser usado dentro de um SessionProvider");
    }
    return context;
}