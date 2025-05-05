import React, { useState } from 'react';
import './App.css';
import FilterBar from './components/FilterBar.jsx';
import ProductList from './components/ProductList.jsx';
import Pagination from './components/Pagination.jsx';
import SummaryBar from './components/SummaryBar.jsx';
import useApiFetch from './hooks/useApiFetch.js';

const App = () => {
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });

  const [page, setPage] = useState(1);
  const { data, loading, error, totalItems } = useApiFetch(filters, page);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setPage(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <SummaryBar totalItems={totalItems} filters={filters} onClear={() => setFilters({ category: '', status: '' })} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ProductList data={data} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalItems / 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
