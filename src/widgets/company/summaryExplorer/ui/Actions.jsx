import { Pen } from "lucide-react";
import { CompanyRequestDeletionButton } from "@features/companyRequestDeletion/ui/CompanyRequestDeletionButton";
import { EditCompanyFeature } from "@features/companyEdit/ui/EditCompanyFeature";
import { Button } from "@shared/ui/Button"

export function Actions({ company, className = "" }) {
    const { id, tradeName } = company;

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <EditCompanyFeature companyId={id} companyName={tradeName} renderTrigger={({ onClick, isDeleting }) => (
                <Button
                    onClick={onClick}
                    renderItem={() => <Pen/>}
                    props={{ disabled: isDeleting }}
                    className={isDeleting ? "cursor-not-allowed!" : ""}
                />
            )}/>
            <CompanyRequestDeletionButton companyId={id} companyName={tradeName} />
        </div>
    );
};