import { Button } from "@shared/ui/Button";
import { CreateCompanyModal } from "./CreateCompanyModal";
import { useState } from "react";

export function CreateCompanyButton() {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <>
            <Button 
                label="Adicionar" 
                className="bg-brand-primary text-white m-2 p-1 px-2 rounded-md" 
                onClick={() => setIsOpen(true)}
            />

            <CreateCompanyModal title={"Cadastrar Empresa"} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    );
};