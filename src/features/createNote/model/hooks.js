import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/api";
import { toast } from "sonner";

export function useCreateNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        
        onMutate: async (newNoteData) => {
            await queryClient.cancelQueries({ queryKey: ["company-notes", newNoteData.company_id] });
            
            const previousNotes = queryClient.getQueryData(["company-notes", newNoteData.company_id]);

            queryClient.setQueryData(["company-notes", newNoteData.company_id], (old) => [
                { 
                    ...newNoteData, 
                    id: `temp-${Date.now()}`,
                    created_at: new Date().toISOString(), 
                    isOptimistic: true 
                },
                ...(old || []),
            ]);

            return { previousNotes };
        },

        onError: (err, variables, context) => {
            if (context?.previousNotes) {
                queryClient.setQueryData(
                    ["company-notes", variables.company_id], 
                    context.previousNotes
                );
            }
            toast.error("Falha ao criar nota");
        },

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ 
                queryKey: ["company-notes", variables.company_id] 
            });
        },

        onSuccess: () => {
            toast.success("Nota criada com sucesso");
        }
    });
}