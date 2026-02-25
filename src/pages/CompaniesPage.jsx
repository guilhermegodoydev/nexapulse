import { Button } from "@shared/ui/Button"

import { CreateCompanyFeature } from "@features/companyCreate/ui/CreateCompanyFeature";

import { KpiDashboardSection } from "@widgets/company/companyStats/ui/KpiDashboardSection";
import { SummaryExplorer } from "@widgets/company/summaryExplorer/ui/SummaryExplorer";

export function CompaniesPage() { 
    return (
        <>
            <header>
                <div className="flex items-center justify-between px-5">
                    <h1 className="text-content-base">Empresas</h1>

                    <div>
                        <CreateCompanyFeature renderTrigger={({ onClick, isPending }) => (
                            <Button 
                                label="Adicionar" 
                                className="bg-brand-primary text-white m-2 p-1 px-2 rounded-md" 
                                onClick={onClick}
                                isLoading={isPending}
                            />
                        )}
                        />
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