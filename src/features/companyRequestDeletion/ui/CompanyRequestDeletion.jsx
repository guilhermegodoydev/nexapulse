export function CompanyRequestDeletion({ companyId, companyName, renderTrigger }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { mutate, isPending } = useRequestCompanyDeletion();

    const handleDelete = () => {
        setModalIsOpen(false);
        mutate(companyId, {
            onSuccess: () => {
                toast.success(`Solicitação de exclusão para a empresa ${companyName} enviada com sucesso!`);
            },
            onError: () => {
                toast.error(`Erro ao solicitar exclusão para a empresa ${companyName}. Tente novamente mais tarde.`);
            }
        });
    };

    return (
        <>
            {renderTrigger({ 
                onClick: () => setModalIsOpen(true),
                isLoading: isPending
            })}

            <ModalConfirm 
                title={`Mover empresa para a lixeira`} 
                description={`A empresa ${companyName} será marcada para exclusão. Esta ação precisa ser aprovada por um administrador para se tornar definitiva. Deseja prosseguir?`}
                isOpen={modalIsOpen}
                onConfirm={handleDelete}
                onCancel={() => setModalIsOpen(false)}
            />
        </>
    );
};