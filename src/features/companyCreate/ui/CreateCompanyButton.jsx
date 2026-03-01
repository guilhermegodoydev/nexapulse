import { useState } from "react";

import { Modal } from "@shared/ui/modal/Modal"
import { Button } from "@shared/ui/Button"

import { useCreateCompany } from "../model/hooks";
import { CompanyForm } from "@entities/company/ui/CompanyForm";

export function CreateCompanyButton() {
    const [ isOpen, setIsOpen ] = useState(false);
    const { mutate, isPending } = useCreateCompany();
    
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (data) => {
        handleClose();
        mutate(data, {
            onSuccess: () => {
                handleClose();
            },
        });
    };

    return (
        <>
            <Button 
                label="Adicionar" 
                className="bg-brand-primary text-white m-2 p-1 px-2 rounded-md" 
                onClick={() => setIsOpen(true)}
                isLoading={isPending}
            />

            <Modal title={"Cadastrar Empresa"} isOpen={isOpen} onClose={handleClose} className="flex flex-col min-h-[80%] w-1/3">
                <CompanyForm onSubmit={handleSubmit} onClose={handleClose}/>
            </Modal>
        </>
    );
};