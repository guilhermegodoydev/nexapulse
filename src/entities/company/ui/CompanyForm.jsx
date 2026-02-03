import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";

import { companyMinimalFormSchema } from "../model/schema";

export function CompanyForm({ onSubmit, onClose, initialState = null }) {
    const [step, setStep] = useState(1);
    const { register, trigger, handleSubmit, reset, formState: { errors }} = useForm({ 
        resolver: zodResolver(companyMinimalFormSchema), 
        shouldUnregister: false, 
        defaultValues: { status: initialState?.status || "ATIVO", lifecycleStage: initialState?.lifecycleStage}
    });

    const handleNextStep = async (e) => {
        e.preventDefault();

        const fieldsByStep = {
            1: ["tradeName", "legalName", "cnpj", "website"],
            2: ["industry", "employees", "annualRevenue"],
            3: ["status", "lifecycleStage"]
        };

        const isValid = await trigger(fieldsByStep[step]);

        if (isValid) {
            setStep(prev => prev + 1);
        }
    };

    const cancel = () => {
        reset();
        setStep(1)
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col justify-between">
            {step === 1 && (
                <div className="space-y-4">
                    <h3>Identificação</h3>

                    <Input 
                        label="Nome Fantasia *" 
                        id="tradeName" 
                        errorMessage={errors?.tradeName?.message}
                        {...register("tradeName")}
                        value={initialState?.tradeName}
                    />

                    <Input 
                        label="Nome Legal" 
                        id="legalName" 
                        errorMessage={errors?.legalName?.message}
                        {...register("legalName")}
                        value={initialState?.legalName}
                    />

                    <Input 
                        label="CNPJ" 
                        id="cnpj" 
                        errorMessage={errors?.cnpj?.message}
                        {...register("cnpj")}
                        value={initialState?.cnpj}
                    />

                    <Input
                        label="Site"
                        id="website"
                        errorMessage={errors?.website?.message}
                        {...register("website")}
                        value={initialState?.website}
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
                        value={initialState?.indutry}
                    />

                    <Input 
                        label="Quantidade de Funcionários" 
                        id="employees" 
                        errorMessage={errors?.employees?.message}
                        {...register("employees")}
                        value={initialState?.employees}
                    />

                    <Input 
                        label="Renda Anual" 
                        id="annualRevenue" 
                        errorMessage={errors?.annualRevenue?.message}
                        {...register("annualRevenue")}
                        value={initialState?.annualRevenue}
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

                    <label htmlFor="lifecycleStage">Ciclo de Vida *</label>
                    <select name="lifecycleStage" id="lifecycleStage" {...register("lifecycleStage")} className="focus:outline-brand-primary bg-gray-50 rounded-md shadow p-2">
                        <option value="CLIENTE">Cliente</option>
                        <option value="LEAD">Lead</option>
                    </select>
                </div>
            )}

            <div className="flex justify-between mt-4">
                {step === 1 ?
                    <Button label="Cancelar" props={{ type: "button" }} onClick={cancel} className="buttonStyle"/>
                    :
                    <Button label="Voltar" props={{ type: "button" }} onClick={() => setStep(prev => prev - 1)} className="buttonStyle"/>
                }

                {step === 3 ? (
                    <Button label="Salvar" props={{ type: "submit" }} className="buttonStyle"/>
                ) : (
                    <Button label="Próximo" props={{ type: "button" }} onClick={handleNextStep} className="buttonStyle"/>
                )}
            </div>
        </form>
    );
};