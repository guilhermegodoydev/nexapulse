import { Trash2, Pen } from "lucide-react";
import { CompanyRequestDeletion } from "@features/companyRequestDeletion/ui/CompanyRequestDeletion";
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
            <CompanyRequestDeletion companyId={id} companyName={tradeName} renderTrigger={({ onClick, isPending }) => (
                <Button
                    onClick={onClick}   
                    isLoading={isPending}
                    renderItem={() => <Trash2 />}
                />
            )}/>
        </div>
    );
};