import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithEmail } from "../api/api";
import { useNavigate } from "react-router-dom";

export function useSignInWithEmail() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ email, password }) => loginWithEmail(email, password),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);

            navigate("/", { replace: true });
        }
    });
}