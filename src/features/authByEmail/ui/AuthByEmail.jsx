import { useState } from "react";
import { useSignInWithEmail } from "../model/hooks";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authByEmailSchema } from "../model/schema";
import { Eye, EyeClosed } from "lucide-react";

export function AuthByEmail() {
    const { mutate, isPending } = useSignInWithEmail();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(authByEmailSchema)
    });
    const [ passwordIsVisible, setPasswordIsVisible] = useState(false);

    const onSubmit = (data) => {
        mutate(data, {
            onError: () => {
                setError("root", {
                    type: "manual",
                    message: "Email ou senha inválidos."
                });
            }
        });
    }; 

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-bg-card border border-border rounded-md p-8 w-full max-w-md space-y-6 text-content-base shadow-sm">
                <div className="flex justify-center items-center">
                    <img src="/logo2.svg" alt="Logo da Nexapulse" className="h-20"/>
                    <h1 className="text-brand-primary text-[40px]">NexaPulse</h1>
                </div>

                <h2 className="text-[18px]">Bem-vindo de volta! Faça login na sua conta</h2>

                <Input 
                    label="Email" 
                    id="email" 
                    errorMessage={errors?.email?.message}
                    autoComplete="email"
                    aria-invalid={errors?.email ? "true" : "false"}
                    aria-describedby={errors?.email ? "email-error" : undefined}
                    {...register("email")} 
                />
                
                <label htmlFor="password">Senha</label>
                <div className="h-10 relative mb-10">
                    <input 
                        id="password" 
                        autoComplete="current-password"
                        type={passwordIsVisible ? "text" : "password"} 
                        aria-invalid={errors?.password ? "true" : "false"}
                        aria-describedby={errors?.password ? "password-error" : undefined}
                        className={`h-full w-full rounded-md bg-gray-50 dark:bg-gray-700 pl-3 focus:outline-brand-primary shadow pr-10`}
                        {...register("password")} 
                    />
                    <button 
                        aria-label={passwordIsVisible ? "Ocultar Senha" : "Mostrar Senha"}
                        aria-controls="password"
                        type="button" 
                        className="absolute top-1/2 right-2 transform -translate-y-1/2" 
                        onClick={() => setPasswordIsVisible(!passwordIsVisible)} 
                    >
                        {passwordIsVisible ? <Eye size={20}/> : <EyeClosed size={20}/>}
                    </button>
                    <p className="text-red-500 text-xs">{errors?.password?.message}</p>
                </div>

                {errors.root && (<p className="text-red-500 text-sm font-medium">{errors.root.message}</p>)}

                {isPending ?
                    <div className="w-full bg-brand-primary rounded-md text-white p-2 flex justify-center">
                        <div className="h-5 w-5 border-3 border-gray-400 border-t-white animate-spin rounded-full"></div>
                    </div>
                    :
                    <Button 
                        type="submit" 
                        isLoading={isPending} 
                        label="Entrar" 
                        className="bg-brand-primary w-full rounded-md text-white p-2" 
                    />
                }
            </form>
        </>
    );
};