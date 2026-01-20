import { Building2, Menu, ChartPie } from "lucide-react";
import { useMediaQuery } from "@shared/lib/hooks/useMediaQuery"
import { useState } from "react";
import { SideBarItem } from "./SideBarItem";
import { SideBarHeader } from "./SideBarHeader";
import { SideBarFooter } from "./SideBarFooter";

const styleIcons = "text-gray-500 scale-100";

export function SideBar () {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const [ isOpen, setOpen ] = useState(false);

    return (
        <div>
            {isMobile && !isOpen ? <button aria-label="Abrir menu" className="" onClick={() => setOpen(true)}><Menu/></button> : null}
            
            <aside className={`fixed flex flex-col justify-between left-0 top-0 bottom-0 bg-white shadow-xl rounded-r-xl transition-all duration-300 ease-in-out ${ isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"} z-[2] w-[80%] group lg:w-auto`}>
                <div className="p-4">
                    <SideBarHeader isOpen={isOpen} onClose={() => setOpen(false)} isMobile={isMobile}/>

                    <ul className="space-y-4 my-4">
                        <li>
                            <SideBarItem label="Dashboard" icon={<ChartPie className={styleIcons}/>} navigateTo="/dashboard"/>
                        </li>
                        <li>
                            <SideBarItem label="Empresas" icon={<Building2 className={styleIcons}/>} navigateTo="/companies"/>
                        </li>
                    </ul>
                </div>

                <SideBarFooter/>
            </aside>

            {isMobile && isOpen 
                ? <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[1]"></div>
                : null
            }
        </div>
    );
};