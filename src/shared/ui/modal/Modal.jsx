import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function Modal({ isOpen, title, onClose, children, className}) {
    if (!isOpen) return null;

    const portalRoot = document.getElementById('modal-root');

    if (!portalRoot) {
        console.error("Modal root elemento não encontrado.");
        return null;
    }

    return createPortal(
        <div className="fixed z-3 backdrop-blur-xs inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button aria-label="Fechar Modal" className="cursor-pointer" onClick={onClose}>
                        <X/>
                    </button>
                </div>
                {children}
            </div>
        </div>
        , portalRoot
    );
};