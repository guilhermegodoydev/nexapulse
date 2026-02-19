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
        values: { 
            trade_name: initialState?.trade_name || "",
            legal_name: initialState?.legal_name || "",
            cnpj: initialState?.cnpj || "",
            website: initialState?.website || "",
            industry: initialState?.industry,
            employees: initialState?.employees,
            annual_revenue: initialState?.annual_revenue,
            status: initialState?.status || "ATIVO", 
            lifecycle_stage: initialState?.lifecycleStage
        }
    });

    const handleNextStep = async (e) => {
        e.preventDefault();

        const fieldsByStep = {
            1: ["trade_name", "legal_name", "cnpj", "website"],
            2: ["industry", "employees", "annual_revenue"],
            3: ["status", "lifecycle_stage"]
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

                    <label htmlFor="lifecycle_stage">Ciclo de Vida *</label>
                    <select name="lifecycle_stage" id="lifecycle_stage" {...register("lifecycle_stage")} className="focus:outline-brand-primary bg-gray-50 rounded-md shadow p-2">
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