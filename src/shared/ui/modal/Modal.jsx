import { X } from "lucide-react";
import { Overlay } from "../overlay/Overlay";

export function Modal({ isOpen, title, description, onClose, children, className }) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center justify-center min-h-screen pointer-events-none">
                <div className={`bg-bg-card p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 text-content-base pointer-events-auto ${className}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold">{title}</h2>
                            {description && <p className="text-sm text-content-muted mt-1">{description}</p>}
                        </div>
                        <button 
                            aria-label="Fechar Modal" 
                            className="cursor-pointer hover:opacity-75 transition-opacity flex-shrink-0 ml-4"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </Overlay>
    );
};