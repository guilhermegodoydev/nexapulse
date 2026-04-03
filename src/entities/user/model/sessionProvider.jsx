import { useState, useEffect } from "react";
import { supabase } from "@shared/api/supabaseClient";
import { SessionContext } from "./sessionContext";

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