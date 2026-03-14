import { useQueryParams } from "./useQueryParams";

export function usePagination() {
    const { getParams, setParams } = useQueryParams();

    const page = Number(getParams('page') || 0);
    const pageSize = 25;

    const handlePageChange = (newPage) => {
        setParams('page', newPage);
    };

    return { page, pageSize, handlePageChange };
}