import { useCallback, useState } from "react";

export function useModalConfirm() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ modalConfig, setModalConfig ] = useState({
        title: '',
        description: '',
        onConfirm: () => {},
    });

    const openModal = useCallback((title, description, onConfirm) => {
        setModalConfig({ title, description, onConfirm });
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return { isOpen, openModal, closeModal, modalConfig };
};