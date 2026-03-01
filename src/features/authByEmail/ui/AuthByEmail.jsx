import { useSignInWithEmail } from "@entities/user/model/hooks";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authByEmailSchema } from "@entities/user/model/schema";
import { useNavigate } from "react-router-dom";

export function AuthByEmail() {
    const { mutate, isPending } = useSignInWithEmail();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(authByEmailSchema),
    });

    const handleLogin = ({ email, password}) => {
        console.log(email, password);
        mutate({ email, password }, {
            onSuccess: () => navigate("/", { replace: true }),
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)} className="bg-card border border-border rounded-lg p-8 w-full max-w-md space-y-6">
                <h1>Autenticação</h1>

                <Input 
                    label="Email" 
                    id="email" 
                    errorMessage={errors?.email?.message}
                    {...register("email")} 
                />
                <Input 
                    label="Senha" 
                    id="password" 
                    type="password" 
                    errorMessage={errors?.password?.message}
                    {...register("password")} 
                />

                <Button type="submit" isLoading={isPending} label="Entrar" />
            </form>
        </>
    );
};