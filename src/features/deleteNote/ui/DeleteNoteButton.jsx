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
            onClick={handleDelete}
            isLoading={isPending}
        >
            <Trash2/>
        </Button>
    );
};