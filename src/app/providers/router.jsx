import { createBrowserRouter, redirect } from "react-router-dom"
import App from "../App";
import { CompaniesPage } from "@pages/CompaniesPage";
import { AuthPage } from "@pages/AuthPage";
import { supabase } from "@shared/api/supabaseClient";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return redirect("/auth");
            return null;
        },
        children: [
            {
                path: "companies",
                element: <CompaniesPage/>,
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthPage/>,
        loader: async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) return redirect("/");
            return null;
        }
    }
]);