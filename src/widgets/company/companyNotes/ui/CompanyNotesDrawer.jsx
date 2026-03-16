import { useCompanyNotes } from "@features/companyViewNotes/model/hooks";
import { Drawer } from "@shared/ui/drawer/Drawer";
import { NoteCard } from "@entities/note/ui/NoteCard";
import { useQueryParams } from "@shared/lib/useQueryParams";
import { DeleteNoteButton } from "@features/deleteNote/ui/DeleteNoteButton";
import { useState } from "react";
import { NewNote } from "@features/createNote/ui/NewNote";

export function CompanyViewNotesDrawer() {
    const { getParams, clearParams } = useQueryParams();
    const [ isCreating, setIsCreating ] = useState(false);

    const companyId = getParams("companyId");
    const isOpen = Boolean(companyId);

    const limitNotes = 5;

    const handleClose = () => {
        clearParams(["companyId"]);
    };

    const { data: notes, isLoading, error } = useCompanyNotes(companyId, limitNotes, isOpen);

    const messageNotes = isLoading ? "Carregando notas..." : notes?.length > 0 ? `${notes.length} notas encontradas` : "Nenhuma nota encontrada";

    const styleButtonCreateNote = `${isCreating || isLoading ? "bg-gray-100 text-content-base events-none cursor-empety cursor-not-allowed" : "bg-brand-primary text-white cursor-pointer"} rounded-md p-2 w-full mt-5`;

    return (
        <Drawer
            title={`Notas`}
            description={messageNotes}
            isOpen={isOpen}
            onClose={handleClose}
            actions={
                <button 
                    disabled={isCreating} 
                    className={styleButtonCreateNote} 
                    onClick={() => setIsCreating(true)}
                >
                    {isLoading ? "Carregando notas..." : isCreating ? "Criando Nota..." : "Nova Nota"}
                </button>
            }
            isLoading={isLoading}
            isError={Boolean(error)}
            errorMessage="Erro ao carregar notas"
        >
            <div className="mt-8 space-y-4">
                {isCreating ? <NewNote companyId={companyId} onClose={() => setIsCreating(false)}/> : null}
                {notes && notes.length > 0 ? (
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
                    <div className="text-center">
                        <p className="text-content-muted text-sm">
                            Nenhuma nota encontrada para esta empresa.
                        </p>
                    </div>
                )}
            </div>
        </Drawer>
    );
}