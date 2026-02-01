import { createContext, useContext } from "react";
import { useModalConfirm } from "@shared/ui/modal/useModalConfirm";
import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";

const ModalConfirmContext = createContext();

export function ModalConfirmProvider({ children }) {
    const { isOpen, openModal, closeModal, modalConfig } = useModalConfirm();

    return (
        <ModalConfirmContext.Provider value={{ openModal, closeModal }}>
            {children}

            <ModalConfirm
                isOpen={isOpen}
                title={modalConfig.title}
                description={modalConfig.description}
                onConfirm={ () => {
                    modalConfig.onConfirm();
                    closeModal();
                }}
                onCancel={closeModal}
            />
        </ModalConfirmContext.Provider>
    );
}

export function useConfirmModal() {
    return useContext(ModalConfirmContext);
}