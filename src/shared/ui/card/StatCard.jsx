import { Card } from "./Card";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";

export function StatCard({ title, value, comparative = "Nenhuma Comparação disponível", trend, intent = "neutral"}) {
    const styles = {
        positive: "text-green-600",
        negative: "text-red-600",
        neutral: "text-content-base"
    };

    const icon = trend === "up" ? <CircleArrowUp /> : 
                 trend === "down" ? <CircleArrowDown /> : "";

    return (
        <Card className="flex flex-col gap-5 justify-between">
            <h2 className="text-gray-500 dark:text-gray-300 font-normal text-[16px]">{title}</h2>
            <p className="font-bold text-3xl text-center dark:text-content-base">{value}</p>
            <div className={`flex justify-center items-center gap-2 ${styles[intent]}`}>
                {icon}
                <p className="font-normal text-sm">{comparative}</p>
            </div>
        </Card>
    );
};