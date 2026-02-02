import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useDeleteCompany } from "@entities/company/model/hooks";

import { Button } from "@shared/ui/Button";
import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";

export function DeleteCompanyButton ({ companyId, companyName }) {
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
            <Button
                onClick={() => setModalIsOpen(true)}   
                isLoading={isPending}
                renderItem={() => <Trash2 />}
            />

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