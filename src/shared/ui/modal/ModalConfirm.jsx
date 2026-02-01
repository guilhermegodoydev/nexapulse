import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function ModalConfirm({ isOpen, title, description, onConfirm, onCancel }) {
    if (!isOpen) return null;

    const portalRoot = document.getElementById('modal-root');

    if (!portalRoot) {
        console.error("Modal root elemento não encontrado.");
        return null;
    }

    return createPortal (
        <div className="fixed z-3 backdrop-blur-xs inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button aria-label="Fechar Modal" className="cursor-pointer" onClick={onCancel}>
                        <X/>
                    </button>
                </div>
                <p className="mb-4">{description}</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="px-4 py-2 rounded-md cursor-pointer bg-brand-primary/92 hover:bg-brand-primary text-white">Cancelar</button>
                    <button onClick={onConfirm} className="px-4 py-2 border-2 border-brand-primary bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">Confirmar</button>
                </div>
            </div>
        </div>,
        portalRoot
    );
};