import { Button } from "@shared/ui/Button";
import { useQueryParams } from "@shared/lib/useQueryParams";
import { NotepadText } from "lucide-react";

export function CompanyViewNotesButton({ companyId }) {
    const { setParams } = useQueryParams();

    return (
        <Button onClick={() => setParams({companyId: companyId})} renderItem={() => <NotepadText/>}/>
    );
}