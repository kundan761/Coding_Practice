import React, { useEffect, useState } from 'react';
import '../styles/FilterBar.css';
import axios from 'axios';

const FilterBar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-bar">
      <div>
        <label>Category:</label>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Status:</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All</option>
          <option value="New">New</option>
          <option value="Popular">Popular</option>
          <option value="Discounted">Discounted</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;