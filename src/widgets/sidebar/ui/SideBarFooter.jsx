import { LogoutButton } from "../../../features/authSignOut/ui/LogoutButton";
import { SideBarItem } from "./SideBarItem";
import { Settings } from "lucide-react";

export function SideBarFooter() {
    return (
        <div>
            <hr className="border-gray-300/80 border-1"/>

            <ul className="space-y-4 my-4 px-4">
                <li>
                    <SideBarItem label="Configurações" navigateTo="config" icon={<Settings className="text-content-base"/>}/>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </div>
    );
};