import { useSignInWithEmail } from "../model/hooks";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authByEmailSchema } from "../model/schema";

export function AuthByEmail() {
    const { mutate, isPending } = useSignInWithEmail();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(authByEmailSchema)
    });

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
                    {...register("email")} 
                />
                
                <Input 
                    label="Senha" 
                    id="password" 
                    type="password" 
                    errorMessage={errors?.password?.message}
                    autoComplete="current-password"
                    {...register("password")} 
                />

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