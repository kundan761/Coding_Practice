import React from 'react';
import '../styles/SummaryBar.css';

const SummaryBar = ({ total, filters, onClear }) => {
  return (
    <div className="summary-bar">
      <span>
        Showing <strong>{total}</strong> result{total !== 1 ? 's' : ''}
      </span>

      <div className="active-filters">
        {filters.category && <span>Category: {filters.category}</span>}
        {filters.status && <span>Status: {filters.status}</span>}
        {(filters.category || filters.status) && (
          <button onClick={onClear}>Clear Filters</button>
        )}
      </div>
    </div>
  );
};

export default SummaryBar;
