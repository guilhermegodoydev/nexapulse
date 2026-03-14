import { CompanyRequestDeletionButton } from "@features/companyRequestDeletion/ui/CompanyRequestDeletionButton";
import { EditCompanyButton } from "@features/companyEdit/ui/EditCompanyButton";
import { CompanyViewNotesButton } from "@features/companyViewNotes/ui/CompanyViewNotesButton";

export function Actions({ company, className = "" }) {
    const { id, tradeName } = company;

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <EditCompanyButton companyId={id} companyName={tradeName} />
            <CompanyViewNotesButton companyId={id} companyName={tradeName} />
            <CompanyRequestDeletionButton companyId={id} companyName={tradeName} />
        </div>
    );
};