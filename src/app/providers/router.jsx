import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import { CompaniesPage } from "@pages/CompaniesPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/companies",
                element: <CompaniesPage/>,
            },
        ]
    },
]);