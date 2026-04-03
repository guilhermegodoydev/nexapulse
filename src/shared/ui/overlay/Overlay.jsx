import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function Overlay({ isOpen, onClose, children }) {
    const [isMounted, setIsMounted] = useState(isOpen);

    if (isOpen && !isMounted) {
        setIsMounted(true);
    }

    useEffect(() => {
        if (!isOpen && isMounted) {
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMounted]);

    useEffect(() => {
        if (!isMounted) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMounted, onClose]);

    if (!isMounted) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const portalRoot = document.getElementById("modal-root");

    return createPortal(
        <div
            className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[3] transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleBackdropClick}
            role="presentation"
        >
            {children}
        </div>,
        portalRoot
    );
}