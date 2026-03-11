import { Toggle } from "@shared/ui/Toggle";
import { useState } from "react";

export function ConfigPage() {
    const [ isChecked, setIsChecked ] = useState(() => {
        return document.documentElement.getAttribute("data-theme") === "dark";
    });

    const handleToggle = (e) => {
        const isCheck = e.target.checked;
        setIsChecked(isCheck);

        const root = document.documentElement;
        if (isCheck) {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("modeTheme", "dark");
        } else {
            root.removeAttribute("data-theme");
            localStorage.setItem("modeTheme", "light"); 
        }
    };

    return (
        <>
            <header>
                <div className="flex items-center justify-between px-5">
                    <h1 className="py-2">Configurações</h1>
                </div>
                <hr className="border-border"/>
            </header>

            <main className="p-4">
                <h2>Modo</h2>
                
                <div className="flex gap-2">
                    <p>Dark Mode</p>
                    <Toggle checked={isChecked} onChecked={handleToggle}/>
                </div>
            </main>
        </>
    );
};