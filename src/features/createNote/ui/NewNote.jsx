import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema } from "../model/schema";
import { useCreateNote } from "../model/hooks";
import { Card } from "@shared/ui/card/Card";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { Textarea } from "@shared/ui/Textarea";

export function NewNote({ companyId, onClose }) {
    const { mutate, isPending } = useCreateNote();

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            company_id: companyId,
            title: "",
            description: ""
        }
    });

    const handleFormSubmit = (data) => {
        mutate(data, {
            onSuccess: () => onClose()
        });
    };

    return (
        <Card className="px-4 py-4 hover:shadow-md transition-shadow animate-in fade-in slide-in-from-top-2">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <Input 
                    placeholder="Título da nota"
                    errorMessage={errors?.title?.message}
                    {...register("title")} 
                />

                <Textarea 
                    placeholder="Escreva sua anotação..."
                    errorMessage={errors?.description?.message}
                    {...register("description")}
                />

                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                    <Button 
                        label="Cancelar" 
                        onClick={onClose} 
                        type="button" 
                        className="bg-transparent rounded-md text-content-muted hover:bg-gray-100 px-4"
                        disabled={isPending}
                    />

                    <Button 
                        label="Salvar Nota" 
                        type="submit"
                        isLoading={isPending}
                        className="bg-brand-primary rounded-md px-6 text-white"
                    />
                </div>
            </form>
        </Card>
    );
}