import { useCompanyNotes } from "@entities/note/model/hooks";
import { Drawer } from "@shared/ui/drawer/Drawer";
import { NoteCard } from "@entities/note/ui/NoteCard";
import { useQueryParams } from "@shared/lib/useQueryParams";
import { DeleteNoteButton } from "@features/deleteNote/ui/DeleteNoteButton";

export function CompanyViewNotesDrawer() {
    const { getParams, clearParams } = useQueryParams();

    const companyId = getParams("companyId");
    const isOpen = Boolean(companyId);

    const limitNotes = 5;

    const handleClose = () => {
        clearParams(["companyId"]);
    };

    const { data: notes, isLoading, error } = useCompanyNotes(companyId, limitNotes, isOpen);

    return (
        <Drawer
            title={`Notas`}
            description={(notes?.length + " notas encontradas") && "Nenhuma nota encontrada"}
            isOpen={isOpen}
            onClose={handleClose}
        >
            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="h-8 w-8 border-2 border-gray-200 border-t-2 border-t-brand-primary rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="text-center py-8">
                    <p className="text-red-500 text-sm">
                        Erro ao carregar notas
                    </p>
                </div>
            ) : notes && notes.length > 0 ? (
                <div className="mt-8 space-y-4">
                    {notes.map((note) => (
                        <NoteCard 
                            key={note.id} 
                            note={note} 
                            companyId={companyId}
                            actions={
                                <>
                                    <DeleteNoteButton companyId={companyId} noteId={note?.id}/>
                                </>
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-content-muted text-sm">
                        Nenhuma nota encontrada para esta empresa.
                    </p>
                </div>
            )}
        </Drawer>
    );
}