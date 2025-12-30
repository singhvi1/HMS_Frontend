import { useMemo } from 'react'

const usePagination = ({ currPage = 1, data = [], itemsPerPage = 10, }) => {
    
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const startIndx = (currPage - 1) * itemsPerPage;
        const endingIndx = startIndx + itemsPerPage;

        return data.slice(startIndx, endingIndx)
    }, [data, currPage, itemsPerPage]);



    return {
        paginatedData,
        totalPages
    };
}

export default usePagination
