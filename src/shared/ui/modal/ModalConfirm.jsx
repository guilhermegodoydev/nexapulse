import { Modal } from "./Modal";

export function ModalConfirm({ isOpen, title, description, onConfirm, onCancel }) {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onCancel}>
            <p className="mb-4">{description}</p>
            <div className="flex justify-end gap-2">
                <button onClick={onCancel} className="px-4 py-2 rounded-md cursor-pointer bg-brand-primary/92 hover:bg-brand-primary text-white">Cancelar</button>
                <button onClick={onConfirm} className="px-4 py-2 border-2 border-brand-primary bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 rounded-md cursor-pointer">Confirmar</button>
            </div>
        </Modal>
    );
};