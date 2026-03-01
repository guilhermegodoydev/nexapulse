import { CreateCompanyButton } from "@features/companyCreate/ui/CreateCompanyButton";

import { KpiDashboardSection } from "@widgets/company/companyStats/ui/KpiDashboardSection";
import { SummaryExplorer } from "@widgets/company/summaryExplorer/ui/SummaryExplorer";

export function CompaniesPage() { 
    return (
        <>
            <header>
                <div className="flex items-center justify-between px-5">
                    <h1 className="text-content-base">Empresas</h1>

                    <div>
                        <CreateCompanyButton />
                    </div>
                </div>
                <hr className="border-border"/>
            </header>

            <main className="p-4">
                <KpiDashboardSection/>

                <SummaryExplorer/>
            </main>
        </>
    );
};