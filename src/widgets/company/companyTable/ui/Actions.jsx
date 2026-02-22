import { Trash2, Pen } from "lucide-react";
import { DeleteCompanyFeature } from "@features/companyDelete/ui/DeleteCompanyFeature";
import { EditCompanyFeature } from "@features/companyEdit/ui/EditCompanyFeature";
import { Button } from "@shared/ui/Button"

export function Actions({ company }) {
    const { id, tradeName } = company;

    return (
        <div className="flex items-center justify-center gap-2">
            <DeleteCompanyFeature companyId={id} companyName={tradeName} renderTrigger={({ onClick, isPending }) => (
                <Button
                    onClick={onClick}   
                    isLoading={isPending}
                    renderItem={() => <Trash2 />}
                />
            )}/>
            <EditCompanyFeature companyId={id} companyName={tradeName} renderTrigger={({ onClick, isDeleting }) => (
                <Button
                    onClick={onClick}
                    renderItem={() => <Pen/>}
                    props={{ disabled: isDeleting }}
                    className={isDeleting ? "cursor-not-allowed!" : ""}
                />
            )}/>
        </div>
    );
};