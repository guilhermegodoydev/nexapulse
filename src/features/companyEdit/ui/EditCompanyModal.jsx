import { useCompanyMinimal } from "@entities/company/model/hooks";
import { CompanyForm } from "@entities/company/ui/CompanyForm";
import { Modal } from "@shared/ui/modal/Modal"

export function EditCompanyModal({ companyId, companyName, isOpen, onClose, onSubmit }) {
    const { data: company, isLoading } = useCompanyMinimal(companyId);
    
    return (
        <Modal title={`Editando ${companyName}`} isOpen={isOpen} onClose={onClose} className="flex flex-col min-h-[80%] w-1/3">
            { isLoading ? 
                <div className="h-10 w-10 border-3 border-gray-200 border-t-3 border-t-brand-primary rounded-full animate-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                :
                <CompanyForm onSubmit={onSubmit} onClose={onClose} initialState={company}/>
            }
        </Modal>
    );
};