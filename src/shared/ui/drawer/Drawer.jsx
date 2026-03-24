import { X } from "lucide-react";
import { Overlay } from "../overlay/Overlay";
import { Card } from "../card/Card";

export function Drawer({ isOpen, title, description, onClose, children, actions, isLoading, isError, errorMessage }) {

    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <Card className={`absolute right-0 h-full rounded-l-xl p-4 rounded-r-none lg:w-120 w-8/10 transition-translate duration-300 ease-in-out shadow-xl rounded-l-xl ${isOpen ? "translate-x-0" : "translate-x-120"}`}>

                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-content-base">{title}</h2>

                    <button
                        aria-label="Fechar Drawer"
                        className="cursor-pointer hover:opacity-75 transition-opacity hover:text-content-base"
                        onClick={onClose}
                    >
                        <X size={20} className="dark:text-content-base"/>
                    </button>
                </div>

                {description && (
                    <p className="text-sm text-content-base mt-1">{description}</p>
                )}
                
                {actions}

                <hr className="absolute"/>

                {isError ? 
                    <div className="text-center py-8">
                        <p className="text-red-500 text-sm">
                            {errorMessage}
                        </p>
                    </div>
                    :
                    isLoading ? 
                        <div className="flex justify-center items-center py-8">
                            <div className="h-8 w-8 border-2 border-gray-200 border-t-2 border-t-brand-primary rounded-full animate-spin"></div>
                        </div> 
                    :  children
                }
            </Card>
        </Overlay>

        
    );
}

/*
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
                    <div className="flex flex-col p-6 border-b border-border">
                        <div className="flex items-start justify-between ">
                            <h2 className="font-bold text-content-base">{title}</h2>

                            <button
                                aria-label="Fechar Drawer"
                                className="cursor-pointer hover:opacity-75 transition-opacity hover:text-content-base"
                                onClick={onClose}
                            >
                                <X size={20} className="dark:text-content-base"/>
                            </button>
                        </div>

                        {description && (
                            <p className="text-sm text-content-base mt-1">{description}</p>
                        )}
                        
                        {actions}
                    </div>
                    
                    {isError ? 
                        <div className="text-center py-8">
                            <p className="text-red-500 text-sm">
                                {errorMessage}
                            </p>
                        </div>
                        :
                        isLoading ? 
                            <div className="flex justify-center items-center py-8">
                                <div className="h-8 w-8 border-2 border-gray-200 border-t-2 border-t-brand-primary rounded-full animate-spin"></div>
                            </div> 
                        : children
                    }
                </div>
            </div>
        </Overlay>
*/