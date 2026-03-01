import { Button } from "@shared/ui/Button";
import { useSignOut } from "@features/authSignOut/model/useSignOut";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const { mutate, isPending } = useSignOut();

    return (
        <Button 
            label="Sair" 
            onClick={() => mutate()}
            renderItem={() => (
                <>
                    <LogOut className="text-content-base rotate-180"/>
                    <p className="text-content-base font-semibold sideBarItemAnimation">Sair</p>
                </>
            )}
            isLoading={isPending}
            className="flex gap-4 p-4 rounded-md hover:bg-blue-500/10 lg:gap-0 lg:overflow-hidden hover:bg-[#f6f4f] rounded-md transition-all duration-500 ease-in-out group-hover:gap-4 w-full cursor-pointer"
        />
    );
};