import React from "react";

const PaginationControls = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPrevPage,
}) => {
  if (totalPages === 0) return null;

  return (
    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
