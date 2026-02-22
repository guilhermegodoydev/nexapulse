import { useState } from "react";
import { toast } from "sonner";

import { Modal } from "@shared/ui/modal/Modal"

import { useCreateCompany } from "@entities/company/model/hooks";
import { CompanyForm } from "@entities/company/ui/CompanyForm";

export function CreateCompanyFeature({ renderTrigger }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const { mutate, isPending } = useCreateCompany();
    
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (data) => {
        handleClose();
        mutate(data, {
            onSuccess: () => {
                toast.success(`Empresa ${data.trade_name} Criada!`);
                handleClose();
            },
            onError: () => {
                toast.error(`Falha ao criar empresa ${data.trade_name}`);
            }
        });
    };

    return (
        <>
            {renderTrigger({ 
                onClick: () => setIsOpen(true),
                isLoading: isPending
            })}

            <Modal title={"Cadastrar Empresa"} isOpen={isOpen} onClose={handleClose} className="flex flex-col min-h-[80%] w-1/3">
                <CompanyForm onSubmit={handleSubmit} onClose={handleClose}/>
            </Modal>
        </>
    );
};