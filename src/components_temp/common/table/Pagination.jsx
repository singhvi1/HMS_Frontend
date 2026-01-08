const Pagination = ({ currPage = 1, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                disabled={currPage === 1}
                onClick={() => onPageChange(currPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            <span className="px-3 py-1 text-sm">
                Page {currPage} of {totalPages}
            </span>

            <button
                disabled={currPage === totalPages}
                onClick={() => onPageChange(currPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
