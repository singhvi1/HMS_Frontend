const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-4 text-sm">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ‹
      </button>

      <span>
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
