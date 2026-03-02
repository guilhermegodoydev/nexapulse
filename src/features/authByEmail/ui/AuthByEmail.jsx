import { useSignInWithEmail } from "../model/hooks";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authByEmailSchema } from "@entities/user/model/schema";

export function AuthByEmail() {
    const { mutate, isPending } = useSignInWithEmail();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(authByEmailSchema)
    });

    return (
        <>
            <form onSubmit={handleSubmit(mutate)} className="bg-bg-card border border-border rounded-lg p-8 w-full max-w-md space-y-6 text-content-base">
                <h1>Autenticação</h1>

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

                <Button type="submit" isLoading={isPending} label="Entrar" className="bg-brand-primary w-full rounded-md text-white p-2"/>
            </form>
        </>
    );
};