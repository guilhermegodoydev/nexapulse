export function RootFallback() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-bg-main text-content-base">
            <img src="/logo2.svg" className="scale-12 opacity-20 animate-pulse" alt="Carregando..." />
        </div>
    );
};