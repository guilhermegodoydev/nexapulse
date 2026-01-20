import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import { CompanyList } from "@pages/companyList/ui/CompanyList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/companies",
                element: <CompanyList/>,
            },
        ]
    },
]);