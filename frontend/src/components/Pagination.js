function getPageNumbers(currentPage, totalPages) {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
  
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
  
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
  
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }
  
  function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
      return null;
    }
  
    const pageNumbers = getPageNumbers(currentPage, totalPages);
  
    return (
      <div className="pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
  
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === currentPage ? "active-page" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
  
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }
  
  export { getPageNumbers };
  export default Pagination;