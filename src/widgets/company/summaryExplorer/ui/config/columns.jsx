import { Badge } from "@shared/ui/badge/Badge";
import { Actions } from "../Actions";

const addBadges = ({ status }) => {
    return (
        <Badge label={status.label} variant={status.variant}/>
    );
};

const addBadgeLifeCycle = ({ tradeName, lifecycleStage }) => {
    return (
        <div className="flex items-center gap-2">
            <p className="font-semibold">{tradeName}</p>
            <Badge label={lifecycleStage} variant="neutral"/>
        </div>
    );
};

export const columns = [
    {label: 'Empresa', key: '', render: addBadgeLifeCycle},
    {label: 'Status', key: '', render: addBadges},
    {label: 'Contato', key: 'mainContactName'},
    {label: 'Setor', key: 'industry'},
    {label: 'Receita Anual', key: 'revenue'},
    {label: 'Último Contato', key: 'lastContact', className: 'text-center'},
    {label: 'Ações', key: '', render: (company) => <Actions company={company}/>, className: 'text-center w-20'},
];