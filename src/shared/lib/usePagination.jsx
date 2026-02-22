import { useSearchParams } from "react-router-dom";

export function usePagination() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = Number(searchParams.get('page') || 0);
    const pageSize = 25;

    const handlePageChange = (newPage) => {
        setSearchParams({ page: String(newPage)});
    };

    return { page, pageSize, handlePageChange };
}