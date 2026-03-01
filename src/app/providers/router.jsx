import { createBrowserRouter, redirect } from "react-router-dom"
import App from "../App";
import { CompaniesPage } from "@pages/CompaniesPage";
import { AuthPage } from "@pages/AuthPage";
import { supabase } from "@shared/api/supabaseClient";
import { RootFallback } from "../ui/RootFallback";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        HydrateFallback: RootFallback,
        loader: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return redirect("/auth");
            return null;
        },
        children: [
            {
                index: true,
                loader: () => redirect("/companies"),
            },
            {
                path: "companies",
                element: <CompaniesPage/>,
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthPage/>,
        HydrateFallback: RootFallback,
        loader: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) return redirect("/companies");
            return null;
        }
    }
]);