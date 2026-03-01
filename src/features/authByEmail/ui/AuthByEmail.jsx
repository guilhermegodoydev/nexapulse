import { useSignInWithEmail } from "../model/hooks";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authByEmailSchema } from "@entities/user/model/schema";

export function AuthByEmail() {
    const { mutate, isPending } = useSignInWithEmail();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(authByEmailSchema),
        defaultValues: {
            email: "fabio@nexus.com",
            password: "fabio123"
        }
    });


    return (
        <>
            <form onSubmit={handleSubmit(mutate)} className="bg-card border border-border rounded-lg p-8 w-full max-w-md space-y-6">
                <h1>Autenticação</h1>

                <Input 
                    label="Email" 
                    id="email" 
                    errorMessage={errors?.email?.message}
                    disabled
                    className="cursor-not-allowed bg-gray-200"
                    {...register("email")} 
                />
                <Input 
                    label="Senha" 
                    id="password" 
                    type="password" 
                    errorMessage={errors?.password?.message}
                    disabled
                    className="cursor-not-allowed bg-gray-200"
                    {...register("password")} 
                />

                <Button type="submit" isLoading={isPending} label="Entrar" />
            </form>
        </>
    );
};