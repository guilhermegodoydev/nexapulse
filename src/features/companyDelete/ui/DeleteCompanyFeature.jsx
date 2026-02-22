import { useState } from "react";
import { toast } from "sonner";

import { useDeleteCompany } from "@entities/company/model/hooks";

import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";

export function DeleteCompanyFeature ({ companyId, companyName, renderTrigger }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate, isPending } = useDeleteCompany();

    const handleDelete = () => {
        setModalIsOpen(false);
        mutate(companyId, {
            onSuccess: () => { 
                toast.success(`Empresa ${companyName} excluída com sucesso!`);
            },
            onError: () => {
                toast.error(`Erro ao excluir a empresa ${companyName}. Tente novamente mais tarde.`);
            }
        });
    };

    return (
        <>
            {renderTrigger({ 
                onClick: () => setModalIsOpen(true),
                isLoading: isPending
            })}

            <ModalConfirm 
                title="Confirmar Exclusão" 
                description={`Tem certeza que deseja excluir ${companyName}`}
                isOpen={modalIsOpen}
                onConfirm={handleDelete}
                onCancel={() => setModalIsOpen(false)}
            />
        </>
    );
};