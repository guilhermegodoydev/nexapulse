import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithEmail } from "../api/api";

export function useSignInWithEmail() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ email, password }) => loginWithEmail(email, password),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user);
        }
    });
}