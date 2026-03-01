import { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { Button } from "@shared/ui/Button";
import { Pen } from "lucide-react";
import { EditCompanyModal } from "./EditCompanyModal";
import { useUpdateCompany } from "../model/hooks";

export function EditCompanyButton({ companyId, companyName }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate } = useUpdateCompany();

    const isDeleting = useIsMutating({ mutationKey: ['delete-company'] }) > 0;

    const handleClose = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (updates) => {
        handleClose();
        mutate({ companyId, updates });
    };

    return (
        <>
            <Button
                onClick={() => setModalIsOpen(true)}
                renderItem={() => <Pen/>}
                props={{ disabled: isDeleting }}
                className={isDeleting ? "cursor-not-allowed!" : ""}
            />

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