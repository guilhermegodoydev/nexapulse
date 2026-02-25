import { Card } from "@shared/ui/card/Card";
import { Badge } from "@shared/ui/badge/Badge";
import { Actions } from "./Actions";

export function CompanyList({ companies }) {

    if (!companies || companies.length === 0) {
        return (
            <div className="py-8 text-center text-content-base">
                Nenhuma empresa encontrada.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {companies.map(company => (
                <Card key={company.id} className="flex flex-col space-y-2 p-0!">

                    <div className="flex items-start justify-between p-2">
                        <div  className="flex items-center gap-2">
                            <p className="font-semibold text-lg truncate">
                                {company.tradeName}
                            </p>
                            <Badge label={company.lifecycleStage} variant="neutral" />
                        </div>
                        <Badge
                            label={company.status?.label}
                            variant={company.status?.variant}
                        />
                    </div>

                    <div className="text-sm text-content-secondary space-y-1 p-2">
                        <p>
                            <span className="font-semibold">Contato: </span>
                            {company.mainContactName}
                        </p>
                        <p>
                            <span className="font-semibold">Setor: </span>
                            {company.industry}
                        </p>
                        <p>
                            <span className="font-semibold">Receita: </span>
                            {company.revenue}
                        </p>
                        <p>
                            <span className="font-semibold">Último Contato:</span>{' '}
                            {company.lastContact }
                        </p>
                    </div>

                    <div>
                        <hr className="border-gray-500/80 dark:border-gray-600"/>

                        <Actions company={company} className="justify-start p-2 gap-6"/>
                    </div>
                </Card>
            ))}
        </div>
    );
};