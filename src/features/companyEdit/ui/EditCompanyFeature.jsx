import { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { toast } from "sonner";

import { EditCompanyModal } from "./EditCompanyModal";
import { useUpdateCompany } from "@entities/company/model/hooks";

export function EditCompanyFeature({ companyId, companyName, renderTrigger }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate } = useUpdateCompany();

    const isDeleting = useIsMutating({ mutationKey: ['delete-company'] }) > 0;

    const handleClose = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (updates) => {
        handleClose();
        mutate({ companyId, updates }, {
            onSuccess: (companyUpdated) => {
                toast.success(`Dados da empresa ${companyUpdated.trade_name} alterados com Sucesso!`);
            },
            onError: () => {
                toast.error(`Falha ao alterar dados de empresa ${companyName}`);
            }
        });
    };

    return (
        <>
            {renderTrigger({ 
                onClick: () => setModalIsOpen(true),
                isLoading: isDeleting
            })}

            {modalIsOpen ? 
                <EditCompanyModal
                    companyId={companyId} 
                    isOpen={modalIsOpen} 
                    onClose={handleClose} 
                    onSubmit={handleSubmit}
                    companyName={companyName}
                />
                : null
            }
        </>
    );
};