import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";
import { Button } from "@shared/ui/Button";
import { useRequestCompanyDeletion } from "../model/hooks";

export function CompanyRequestDeletionButton({ companyId, companyName }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate, isPending } = useRequestCompanyDeletion();

    const handleDelete = () => {
        setModalIsOpen(false);
        mutate({ companyId, companyName });
    };

    return (
        <>
            <Button
                onClick={() => setModalIsOpen(true)}   
                isLoading={isPending}
                renderItem={() => <Trash2 />}
            />

            <ModalConfirm 
                title={`Mover empresa para a lixeira`} 
                description={`A empresa ${companyName} será marcada para exclusão. Esta ação precisa ser aprovada por um administrador para se tornar definitiva. Deseja prosseguir?`}
                isOpen={modalIsOpen}
                onConfirm={handleDelete}
                onCancel={() => setModalIsOpen(false)}
            />
        </>
    );
};