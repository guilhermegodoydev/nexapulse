import { Trash2 } from "lucide-react";
import { useDeleteNote } from "../model/hooks";
import { Button } from "@shared/ui/Button";

export function DeleteNoteButton({ companyId, noteId }) {
    const { mutate, isPending } = useDeleteNote();

    const handleDelete = () => {
        mutate({ companyId, noteId });
    };

    return (
        <Button
            renderItem={() => <Trash2/>}
            onClick={handleDelete}
            isLoading={isPending}
        />
    );
};