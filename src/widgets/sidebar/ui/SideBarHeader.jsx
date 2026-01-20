import { Menu } from "lucide-react";

export function SideBarHeader({ isOpen, isMobile, onClose}) {

    return (
        <div className="flex mb-10 gap-4 lg:gap-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:gap-4">
            {isOpen && isMobile
                ? <button aria-label="Fechar menu" onClick={onClose}><Menu/></button>
                : <img src="public/logo2.svg" alt="NexaPulse Logo" className="w-[55px]"/>
            }
            <h1 className="text-brand-primary sideBarItemAnimation">NexaPulse</h1>
        </div>
    );
};