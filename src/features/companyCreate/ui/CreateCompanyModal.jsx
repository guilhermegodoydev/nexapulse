import { Modal } from "@shared/ui/modal/Modal"
import { useForm } from "react-hook-form";
import { Input } from "@shared/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema } from "@entities/company/model/schema";
import { Button } from "@shared/ui/Button";
import { useState } from "react";
import { useCreateCompany } from "@entities/company/model/hooks";
import { toast } from "sonner";

export function CreateCompanyModal({ title, isOpen, onClose }) {
    const { mutate, isPending } = useCreateCompany();
    const { register, trigger, handleSubmit, reset, formState: { errors }} = useForm({ 
        resolver: zodResolver(createCompanySchema), 
        shouldUnregister: false, 
        defaultValues: { status: "ATIVO"
    }});
    const [step, setStep] = useState(1);

    const handleNextStep = async (e) => {
        e.preventDefault();

        const fieldsByStep = {
            1: ["trade_name", "legal_name", "cnpj", "website"],
            2: ["industry", "employees", "annual_revenue"]
        };

        const isValid = await trigger(fieldsByStep[step]);

        if (isValid) {
            setStep(prev => prev + 1);
        }
    };
    
    const prevStep = () => setStep(prev => prev - 1);

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`Empresa ${data.trade_name} Criada!`);
                reset();
                setStep(1);
                onClose();
            },
            onError: () => {
                toast.error(`Falha ao criar empresa ${data.trade_name}`);
            }
        });
    };

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose} className="flex flex-col min-h-[80%] w-1/3">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-between">
                {step === 1 && (
                    <div className="space-y-4">
                        <h3>Identificação</h3>

                        <Input 
                            label="Nome Fantasia *" 
                            id="trade_name" 
                            errorMessage={errors?.trade_name?.message}
                            {...register("trade_name")}
                        />

                        <Input 
                            label="Nome Legal" 
                            id="legal_name" 
                            errorMessage={errors?.legal_name?.message}
                            {...register("legal_name")}
                        />

                        <Input 
                            label="CNPJ" 
                            id="cnpj" 
                            errorMessage={errors?.cnpj?.message}
                            {...register("cnpj")}
                        />

                        <Input
                            label="Site"
                            id="website"
                            errorMessage={errors?.website?.message}
                            {...register("website")}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="flex-grow space-y-4">
                        <h3>Perfil de Mercado</h3>

                        <Input 
                            label="Setor *" 
                            id="industry" 
                            errorMessage={errors?.industry?.message}
                            {...register("industry")}
                        />

                        <Input 
                            label="Quantidade de Funcionários" 
                            id="employees" 
                            errorMessage={errors?.employees?.message}
                            {...register("employees")}
                        />

                        <Input 
                            label="Renda Anual" 
                            id="annual_revenue" 
                            errorMessage={errors?.annual_revenue?.message}
                            {...register("annual_revenue")}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col space-y-4">
                        <h3>Governança e Status</h3>
                        
                        <label htmlFor="status">Status *</label>
                        <select id="status" name="status" {...register("status")} className="focus:outline-brand-primary bg-gray-50 rounded-md shadow p-2">
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
                            <option value="CHURN">Churn</option>
                        </select>

                        <label htmlFor="lifeCycle">Ciclo de Vida *</label>
                        <select name="lifeCycle" id="lifeCycle" {...register("lifecycle_stage")} className="focus:outline-brand-primary bg-gray-50 rounded-md shadow p-2">
                            <option value="LEAD">Lead</option>
                            <option value="CLIENTE">Cliente</option>
                        </select>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <Button label="Voltar" props={{ type: "button" }} onClick={prevStep} className={`buttonStyle ${step === 1 ? "invisible pointer-events-none" : ""}`}/>

                    {step === 3 ? (
                        <Button label="Salvar" props={{ type: "submit" }} isLoading={isPending} className="buttonStyle"/>
                    ) : (
                        <Button label="Próximo" props={{ type: "button" }} onClick={handleNextStep} className="buttonStyle"/>
                    )}
                </div>
            </form>
        </Modal>
    );
};