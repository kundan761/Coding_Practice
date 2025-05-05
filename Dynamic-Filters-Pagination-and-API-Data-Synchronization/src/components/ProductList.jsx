import React from 'react';
import '../styles/ProductList.css';

const getStatusTag = (id) => {
  // Mock status by product ID for consistent results
  const tags = ['New', 'Popular', 'Discounted'];
  return tags[id % tags.length];
};

const ProductList = ({ data = [] }) => {
  if (data.length === 0) return <p>No products found.</p>;

  return (
    <div className="product-list">
      {data.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Category: {product.category}</p>
            <span className={`tag ${getStatusTag(product.id).toLowerCase()}`}>
              {getStatusTag(product.id)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
