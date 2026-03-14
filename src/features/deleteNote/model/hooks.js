import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../api/api";
import { toast } from "sonner";

export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ noteId }) => deleteNote(noteId),
        onSuccess: (_, variables) => {
            const { companyId, noteId } = variables;
            
            queryClient.setQueriesData({ queryKey: ['company-notes', companyId] }, (old) => {
                if (!old) return old;
                return old.filter(note => note.id !== noteId);
            });

            toast.success("Nota excluída com sucesso.");
        },
        onErros: () => {
            toast.error("Erro ao excluir nota. \nTente novamente mais tarde.");
        },
    });
}