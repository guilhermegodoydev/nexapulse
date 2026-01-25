import { Trash2 } from "lucide-react";
import { useDeleteCompany } from "@entities/company/model/hooks";
import { useModalConfirm } from "@app/providers/modal";
import { Button } from "@shared/ui/Button";
import { toast } from "sonner";

export function DeleteCompanyButton ({ companyId, companyName }) {
    const { openModal, closeModal } = useModalConfirm();
    const { mutate, isPending } = useDeleteCompany();

    const handleDelete = () => {
        mutate(companyId, {
            onSuccess: () => {
                toast.success(`Empresa ${companyName} excluída com sucesso!`);
                closeModal();
            },
            onError: () => {
                toast.error(`Erro ao excluir a empresa ${companyName}. Tente novamente mais tarde.`);
                closeModal();
            }
        });
    };

    return (
        <>
            <Button
                onClick={() => openModal('Confirmar Exclusão', `Tem certeza que deseja excluir ${companyName}?`, handleDelete)}   
                isLoading={isPending}
                renderItem={() => <Trash2 />}
            />
        </>
    );
};