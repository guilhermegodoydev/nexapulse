import { useState } from "react";

import { useDeleteCompany } from "@entities/company/model/hooks";

import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";

export function DeleteCompanyFeature ({ companyId, companyName, renderTrigger }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate, isPending } = useDeleteCompany();

    const handleDelete = () => {
        setModalIsOpen(false);
        mutate({ companyId, companyName });
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