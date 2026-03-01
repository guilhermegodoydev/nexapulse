import { AuthByEmail } from "@features/authByEmail/ui/AuthByEmail";

export function AuthPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-bg-main">
            <AuthByEmail />
        </div>
    );
};