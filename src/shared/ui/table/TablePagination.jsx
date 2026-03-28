import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button";

export function TablePagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const styleButton = "flex  items-center  gap-2 bg-bg-card border border-brand-primary text-content-base hover:bg-hover-bg disabled:opacity-50 px-4 py-2 rounded-md mt-4";

  return (
    <div className="flex justify-between items-center w-full">
      <Button 
        className={styleButton + (currentPage > 1 ? "" : " invisible")} 
        onClick={() => onPageChange(currentPage - 2)}
      >
        <ArrowLeft size={16} /> Anterior
      </Button>
      
      <span className="text-content-base font-medium">Página {currentPage} de {totalPages}</span>

      <Button 
        className={styleButton + (currentPage < totalPages ? "" : " invisible")} 
        onClick={() => onPageChange(currentPage)}
      >
        Próximo <ArrowRight size={16} />
      </Button>
    </div>
  );
}
