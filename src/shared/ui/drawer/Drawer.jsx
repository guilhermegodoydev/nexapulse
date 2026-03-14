import { X } from "lucide-react";
import { Overlay } from "../overlay/Overlay";

export function Drawer({ isOpen, title, description, onClose, children }) {

    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <div className="pointer-events-none h-screen flex justify-end">
                <div
                    className={`
                        bg-bg-card h-full lg:w-120 w-8/10 pointer-events-auto 
                        transition-translate duration-300 ease-in-out
                        shadow-xl rounded-l-xl
                        ${isOpen ? "translate-x-0" : "translate-x-120"}
                    `}
                >
                    <div className="flex items-start justify-between p-6 border-b border-border">
                        <div>
                            <h2 className="font-bold text-content-base">{title}</h2>
                            {description && (
                                <p className="text-sm text-content-base mt-1">{description}</p>
                            )}
                        </div>
                        <button
                            aria-label="Fechar Drawer"
                            className="cursor-pointer hover:opacity-75 transition-opacity hover:text-content-base"
                            onClick={onClose}
                        >
                            <X size={20} className="dark:text-content-base"/>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6">
                        {children}
                    </div>
                </div>
            </div>
        </Overlay>
    );
}
