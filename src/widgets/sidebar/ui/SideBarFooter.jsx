import { SideBarItem } from "./SideBarItem";
import { LogOut, Settings } from "lucide-react";

export function SideBarFooter() {
    return (
        <div>
            <hr className="border-gray-300/80 border-1"/>

            <ul className="space-y-4 my-4 px-4">
                <li>
                    <SideBarItem label="Sair" icon={<LogOut className="text-content-base rotate-180"/>}/>
                </li>
                <li>
                    <SideBarItem label="Configurações" icon={<Settings className="text-content-base"/>}/>
                </li>
            </ul>
        </div>
    );
};