import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../api/api";
import { useNavigate } from "react-router-dom";

export function useSignOut() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            queryClient.clear();
            navigate("/auth", { replace: true });
        }
    });
}