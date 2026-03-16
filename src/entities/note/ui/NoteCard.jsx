import { Card } from "@shared/ui/card/Card";

export function NoteCard({ note, actions }) {
    return (
        <Card className="px-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
                <h3 className="font-semibold text-content-base text-sm truncate" title={note.title}>
                    {note.title}
                </h3>

                <p className="text-content-muted text-sm leading-relaxed overflow-y-auto h-18">{note.description}</p>

                <p className="text-xs text-content-muted">
                    Criado em {note.createdAt}
                </p>

                <hr />

                <div className="flex gap-4">
                    {actions}
                </div>
            </div> 
        </Card>
    );
}