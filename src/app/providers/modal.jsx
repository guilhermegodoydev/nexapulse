import { createContext, useContext } from "react";
import { useModal } from "@shared/ui/modal/useModal";
import { ModalConfirm } from "@shared/ui/modal/ModalConfirm";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const { isOpen, openModal, closeModal, modalConfig } = useModal();

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
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
        </ModalContext.Provider>
    );
}

export function useModalConfirm() {
    return useContext(ModalContext);
}